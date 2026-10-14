// Lógica original do protótipo Visus Labs, adaptada para rodar dentro do app.
// Mantém os mesmos IDs, mensagens e cálculos; corrige carregamento e sobreposição.
import type { FaceLandmarker, NormalizedLandmark } from "@mediapipe/tasks-vision";

const MP_VERSION = "0.10.14";
const WASM_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}/wasm`;
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

// O detector é criado uma única vez e reaproveitado (antes era recriado a cada clique).
let landmarkerPromise: Promise<FaceLandmarker> | null = null;
class LoadError extends Error {}

function getLandmarker(onStage: (s: string) => void) {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      try {
        onStage("Carregando biblioteca de visão…");
        const vision = await import("@mediapipe/tasks-vision");
        onStage("Carregando arquivos de execução…");
        const files = await vision.FilesetResolver.forVisionTasks(WASM_URL);
        onStage("Baixando modelo de pontos faciais (~3 MB)…");
        return await vision.FaceLandmarker.createFromOptions(files, {
          baseOptions: { modelAssetPath: MODEL_URL, delegate: "CPU" },
          runningMode: "IMAGE",
          numFaces: 1,
          outputFaceBlendshapes: false,
        });
      } catch (e) {
        console.error(e);
        throw new LoadError(
          "Não foi possível carregar o modelo de visão. Verifique sua conexão e tente novamente.",
        );
      }
    })();
    landmarkerPromise.catch(() => (landmarkerPromise = null));
  }
  return landmarkerPromise;
}

export function setupVisusPage() {
  const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
  let selectedFile: File | null = null;
  let selectedImage: HTMLImageElement | null = null;
  let selectedObjectUrl: string | null = null;
  let lastPoints: NormalizedLandmark[] | null = null;
  let busy = false;

  const scrollTo = (id: string) => () => $(id).scrollIntoView({ behavior: "smooth", block: "start" });
  $("scrollUpload").onclick = $("startBtn").onclick = scrollTo("analyzer");
  $("scrollUploadSecondary").onclick = scrollTo("analyzer");
  $("howBtn").onclick = scrollTo("how");
  $("premiumBtn").onclick = () =>
    alert("Os recursos avançados da Visus Labs ainda estão em desenvolvimento. Esta versão não processa pagamentos.");

  const dz = $("dropzone");
  const input = $<HTMLInputElement>("file");
  const img = $<HTMLImageElement>("preview");
  const canvas = $<HTMLCanvasElement>("landmarkCanvas");
  const btn = $<HTMLButtonElement>("analyzeBtn");

  function showToast(msg: string, kind: "info" | "error" = "info") {
    const t = $("toast");
    t.textContent = msg;
    t.style.display = "block";
    t.classList.toggle("error", kind === "error");
  }
  function resetReport() {
    $("empty").style.display = "";
    $("result").style.display = "none";
  }
  function clearLandmarkOverlay() {
    lastPoints = null;
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    dz.classList.remove("has-landmarks");
    $("landmarkStatus").textContent = "Os pontos detectados aparecerão sobre a foto após a análise.";
  }
  function drawLandmarks(points: NormalizedLandmark[]) {
    const { width: w, height: h } = img.getBoundingClientRect();
    if (!w || !h) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const r = Math.max(1.25, Math.min(2.1, w / 180));
    ctx.fillStyle = "#8bdcff";
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, r, 0, Math.PI * 2);
      ctx.fill();
    }
    dz.classList.add("has-landmarks");
    $("landmarkStatus").textContent =
      "Visualização ativa: " + points.length + " pontos estimados. Confira se acompanham os contornos reais do rosto.";
  }

  function loadFile(file?: File | null) {
    if (!file || busy) return;
    if (!file.type.startsWith("image/")) return showToast("Selecione um arquivo de imagem válido.", "error");
    if (file.size > 12 * 1024 * 1024) return showToast("A imagem deve ter até 12 MB.", "error");
    selectedFile = file;
    selectedImage = null;
    if (selectedObjectUrl) URL.revokeObjectURL(selectedObjectUrl);
    selectedObjectUrl = URL.createObjectURL(file);
    clearLandmarkOverlay();
    resetReport();
    img.onload = () => {
      selectedImage = img;
      showToast("Foto carregada. Clique em “Executar análise básica”.");
    };
    img.onerror = () => {
      dz.classList.remove("has-image");
      showToast("Não foi possível abrir esta imagem. Tente um arquivo JPG, PNG ou WEBP.", "error");
    };
    img.src = selectedObjectUrl;
    dz.classList.add("has-image");
    showToast("Abrindo foto…");
  }

  const onChange = () => {
    loadFile(input.files?.[0]);
    input.value = ""; // permite escolher a mesma foto novamente
  };
  const onDragOn = (e: DragEvent) => { e.preventDefault(); dz.classList.add("drag"); };
  const onDragOff = (e: DragEvent) => { e.preventDefault(); dz.classList.remove("drag"); };
  const onDrop = (e: DragEvent) => loadFile(e.dataTransfer?.files?.[0]);
  input.addEventListener("change", onChange);
  dz.addEventListener("dragenter", onDragOn);
  dz.addEventListener("dragover", onDragOn);
  dz.addEventListener("dragleave", onDragOff);
  dz.addEventListener("drop", onDragOff);
  dz.addEventListener("drop", onDrop);

  // Redesenha os pontos se o tamanho exibido da foto mudar (rotação, redimensionamento).
  const ro = new ResizeObserver(() => lastPoints && drawLandmarks(lastPoints));
  ro.observe(img);

  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / Math.max(1, arr.length);

  btn.onclick = async () => {
    if (!selectedImage || !selectedFile) return showToast("Primeiro, escolha uma foto.", "error");
    if (!selectedImage.complete || !selectedImage.naturalWidth)
      return showToast("A foto ainda está carregando. Tente novamente em instantes.", "error");
    busy = true;
    btn.disabled = true;
    input.disabled = true;
    try {
      const landmarker = await getLandmarker((s) => { btn.textContent = s; showToast(s); });
      btn.textContent = "Detectando pontos faciais…";
      showToast("Detectando pontos faciais…");
      const out = landmarker.detect(selectedImage);
      if (!out.faceLandmarks?.length)
        throw new Error("Não consegui detectar um rosto. Tente uma foto frontal, nítida e com boa iluminação.");
      const p = out.faceLandmarks[0]!;
      const W = selectedImage.naturalWidth, H = selectedImage.naturalHeight;
      const px = (i: number) => ({ x: p[i]!.x * W, y: p[i]!.y * H });
      const left = px(234), right = px(454), top = px(10), chin = px(152), nose = px(1);
      const outerEyeLeft = px(33), outerEyeRight = px(263);
      const width = dist(left, right), height = dist(top, chin);
      if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0)
        throw new Error("Não foi possível calcular as proporções. Tente outra foto frontal.");
      const ratio = width / height;
      const midX = (left.x + right.x) / 2;
      const noseOffset = (Math.abs(nose.x - midX) / (width / 2)) * 100;
      const eyeRatio = dist(outerEyeLeft, outerEyeRight) / width;
      // Erro de correspondência bilateral (não é uma escala validada de simetria estética).
      const pairs = [[234, 454], [93, 323], [132, 361], [58, 288], [172, 397], [127, 356], [136, 365], [150, 379], [176, 400]];
      const bilateralMismatch = avg(
        pairs.map(([a, b]) => {
          const A = px(a!), B = px(b!);
          return (Math.hypot(2 * midX - A.x - B.x, A.y - B.y) / width) * 100;
        }),
      );
      $("empty").style.display = "none";
      $("result").style.display = "block";
      lastPoints = p;
      drawLandmarks(p);
      $("ratio").textContent = ratio.toFixed(2);
      $("eyeRatio").textContent = (eyeRatio * 100).toFixed(1) + "%";
      $("noseOffset").textContent = noseOffset.toFixed(1) + "%";
      $("symmetry").textContent = bilateralMismatch.toFixed(1) + "%";
      $("quality").textContent = "Rosto detectado • " + p.length + " pontos estimados • análise executada no dispositivo";
      showToast("Análise concluída. Confira visualmente se os pontos acompanham o rosto; as medidas ainda são estimativas 2D.");
    } catch (err) {
      console.error(err);
      clearLandmarkOverlay();
      resetReport();
      const msg = err instanceof Error && err.message ? err.message : "Ocorreu um erro na análise.";
      showToast(msg, "error");
    } finally {
      busy = false;
      btn.disabled = false;
      input.disabled = false;
      btn.textContent = "Executar análise básica";
    }
  };

  return () => {
    ro.disconnect();
    input.removeEventListener("change", onChange);
    dz.removeEventListener("dragenter", onDragOn);
    dz.removeEventListener("dragover", onDragOn);
    dz.removeEventListener("dragleave", onDragOff);
    dz.removeEventListener("drop", onDragOff);
    dz.removeEventListener("drop", onDrop);
    if (selectedObjectUrl) URL.revokeObjectURL(selectedObjectUrl);
  };
}
