import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { setupVisusPage } from "@/lib/visus-analyzer";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/_authenticated/analise")({
  head: () => ({
    meta: [
      { title: "Análise — Visus Labs" },
      { name: "description", content: "Envie uma foto frontal e obtenha as medidas geométricas do seu rosto." },
      { property: "og:title", content: "Análise — Visus Labs" },
      { property: "og:description", content: "Captura e detecção de pontos faciais no navegador." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Analise,
});

function Analise() {
  useEffect(() => setupVisusPage(), []);
  return (
    <>
      <SiteHeader />
      <main className="wrap analysis-page">
        <div className="sectionhead">
          <div>
            <h2>Nova análise</h2>
            <p>Comece com uma foto frontal nítida e bem iluminada.</p>
          </div>
          <span className="tag">VERSÃO DE TESTE</span>
        </div>
        <section className="grid" id="analyzer">
          <div className="panel">
            <h3>01 / Envie sua foto</h3>
            <p className="muted" style={{ fontSize: 13, marginTop: 0 }}>
              Use uma foto frontal, sem filtros, com o rosto inteiro visível.
            </p>
            <div className="upload" id="dropzone">
              <input type="file" id="file" accept="image/*" aria-label="Escolher foto facial" />
              <div className="upload-content">
                <div className="uploadicon">＋</div>
                <strong>Escolher ou arrastar uma foto</strong>
                <small>JPG, PNG ou WEBP • recomendação: boa iluminação</small>
              </div>
              <div className="photo-frame">
                <img id="preview" className="preview" alt="Prévia da foto selecionada" />
                <canvas id="landmarkCanvas" className="landmark-canvas" aria-label="Pontos faciais detectados" />
              </div>
            </div>
            <div className="checks">
              <span className="check">Rosto centralizado</span>
              <span className="check">Sem filtros</span>
              <span className="check">Frontal</span>
            </div>
            <button className="btn primary full" id="analyzeBtn">Executar análise básica</button>
            <div className="toast" id="toast" role="status" aria-live="polite" />
            <p className="note">
              A análise calcula referências geométricas aproximadas a partir de pontos detectados no
              navegador. Uma foto 2D não permite inferir com precisão todas as características anatômicas.
            </p>
          </div>
          <div className="panel">
            <h3>02 / Leitura preliminar</h3>
            <p className="muted" style={{ fontSize: 13, marginTop: 0 }}>
              Resultados geométricos estimados a partir da imagem.
            </p>
            <div className="result-empty" id="empty">
              <div>
                <div className="big">◎</div>
                <strong>Sua leitura aparecerá aqui</strong>
                <p style={{ fontSize: 12 }}>Envie uma foto para começar.</p>
              </div>
            </div>
            <div className="result" id="result">
              <div className="scoreline">
                <div className="scorecircle"><strong style={{ fontSize: 17 }}>2D</strong></div>
                <div>
                  <div style={{ fontWeight: 750 }}>Medidas geométricas estimadas</div>
                  <div className="muted" style={{ fontSize: 12 }}>
                    O relatório completo com as 34 medidas e notas chega na próxima etapa.
                  </div>
                  <div className="note" id="quality" />
                  <div className="note" id="landmarkStatus">
                    Os pontos detectados aparecerão sobre a foto após a análise.
                  </div>
                </div>
              </div>
              <div className="stats">
                <div className="stat"><label>Largura / altura facial</label><strong id="ratio">—</strong><small>Distâncias 2D em pixels</small></div>
                <div className="stat"><label>Distância entre cantos externos dos olhos</label><strong id="eyeRatio">—</strong><small>Como fração da largura facial</small></div>
                <div className="stat"><label>Desvio horizontal do nariz</label><strong id="noseOffset">—</strong><small>% da meia largura facial</small></div>
                <div className="stat"><label>Diferença bilateral média</label><strong id="symmetry">—</strong><small>% da largura facial; menor = mais semelhante</small></div>
              </div>
              <div className="note warn">
                São estimativas geométricas 2D, não medidas anatômicas clínicas. Inclinação da cabeça,
                perspectiva, expressão, cabelo e oclusões afetam os resultados.
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
