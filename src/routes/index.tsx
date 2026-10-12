import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { setupVisusPage } from "@/lib/visus-analyzer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Visus Labs — Análise facial" },
      {
        name: "description",
        content:
          "Explore proporções faciais com métricas geométricas 2D calculadas no seu navegador, com limites claros.",
      },
      { property: "og:title", content: "Visus Labs — Análise facial" },
      {
        property: "og:description",
        content: "Métricas faciais geométricas 2D explicáveis, processadas no navegador.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#050505" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => setupVisusPage(), []);

  return (
    <>
      <header>
        <div className="wrap nav">
          <div className="brand">
            <span className="mark">V</span> VISUS{" "}
            <span style={{ fontSize: 10, color: "#a2a8b1", fontWeight: 650, letterSpacing: ".16em" }}>
              LABS
            </span>
          </div>
          <div className="navright">
            <span className="tag">BETA • BRASIL</span>
            <button className="btn" id="scrollUpload">Começar análise</button>
          </div>
        </div>
      </header>
      <main className="wrap">
        <section className="hero">
          <div>
            <div className="eyebrow">ANÁLISE FACIAL · VISUS LABS</div>
            <h1>
              Seu rosto.
              <br />
              <span>Em perspectiva.</span>
            </h1>
            <p>
              Explore proporções faciais com métricas visuais, referências claras e uma análise que
              explica o que está sendo medido — e quais são os limites de uma fotografia.
            </p>
            <div className="hero-actions">
              <button className="btn primary" id="startBtn">Começar análise ↗</button>
              <button className="btn" id="howBtn">Conhecer o método</button>
            </div>
            <div className="note">
              Ferramenta de análise visual. Estimativas 2D não definem beleza, saúde ou valor pessoal.
            </div>
          </div>
          <div className="hero-visual">
            <div className="float f1">
              MÉTRICAS<b>Proporções e ângulos</b>
            </div>
            <div className="orb">
              <div className="faceicon">◎</div>
            </div>
            <div className="float f2">
              VISUS ENGINE<b>Leitura geométrica 2D</b>
            </div>
          </div>
        </section>

        <div className="sectionhead">
          <div>
            <h2>Uma visão mais completa do rosto</h2>
            <p>Organize a análise em dimensões distintas, sem reduzir tudo a um único número.</p>
          </div>
          <span className="tag">MÉTODO EM DESENVOLVIMENTO</span>
        </div>
        <section className="pillars" aria-label="Dimensões da análise">
          <article className="pillar">
            <div className="pillar-num">01 / HARMONIA</div>
            <h3>Proporções</h3>
            <p>Relações entre terços faciais, largura, altura e espaçamento.</p>
          </article>
          <article className="pillar">
            <div className="pillar-num">02 / ESTRUTURA</div>
            <h3>Contornos</h3>
            <p>Referências geométricas da mandíbula, queixo e maçãs do rosto.</p>
          </article>
          <article className="pillar">
            <div className="pillar-num">03 / PERFIL</div>
            <h3>Ângulos laterais</h3>
            <p>Uma etapa futura para medidas que exigem uma vista de perfil.</p>
          </article>
          <article className="pillar">
            <div className="pillar-num">04 / CONTEXTO</div>
            <h3>Interpretação</h3>
            <p>Entenda cada medida, sua referência e o efeito da qualidade da foto.</p>
          </article>
        </section>

        <div className="sectionhead" id="how">
          <div>
            <h2>Uma leitura, várias dimensões</h2>
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
              navegador. Uma foto 2D não permite inferir com precisão todas as características
              anatômicas.
            </p>
          </div>
          <div className="panel">
            <h3>02 / Seu relatório</h3>
            <p className="muted" style={{ fontSize: 13, marginTop: 0 }}>
              Resultados geométricos estimados a partir da imagem.
            </p>
            <div className="result-empty" id="empty">
              <div>
                <div className="big">◎</div>
                <strong>Seu relatório aparecerá aqui</strong>
                <p style={{ fontSize: 12 }}>Envie uma foto para começar.</p>
              </div>
            </div>
            <div className="result" id="result">
              <div className="scoreline">
                <div className="scorecircle">
                  <strong style={{ fontSize: 17 }}>2D</strong>
                </div>
                <div>
                  <div style={{ fontWeight: 750 }}>Medidas geométricas estimadas</div>
                  <div className="muted" style={{ fontSize: 12 }}>
                    Sem nota estética ou padrão universal de beleza.
                  </div>
                  <div className="note" id="quality" />
                  <div className="note" id="landmarkStatus">
                    Os pontos detectados aparecerão sobre a foto após a análise.
                  </div>
                </div>
              </div>
              <div className="stats">
                <div className="stat">
                  <label>Largura / altura facial</label>
                  <strong id="ratio">—</strong>
                  <small>Distâncias 2D em pixels</small>
                </div>
                <div className="stat">
                  <label>Distância entre cantos externos dos olhos</label>
                  <strong id="eyeRatio">—</strong>
                  <small>Como fração da largura facial</small>
                </div>
                <div className="stat">
                  <label>Desvio horizontal do nariz</label>
                  <strong id="noseOffset">—</strong>
                  <small>% da meia largura facial</small>
                </div>
                <div className="stat">
                  <label>Diferença bilateral média</label>
                  <strong id="symmetry">—</strong>
                  <small>% da largura facial; menor = mais semelhante nesta amostra</small>
                </div>
              </div>
              <div className="note warn">
                São estimativas geométricas 2D, não medidas anatômicas clínicas. Inclinação da
                cabeça, perspectiva, expressão, cabelo e oclusões afetam os resultados. Diferenças
                pequenas não devem ser interpretadas como defeitos.
              </div>
            </div>
          </div>
        </section>

        <section className="premiumbox">
          <div>
            <div className="eyebrow goldtext">VISUS LABS · EM BREVE</div>
            <h3>Uma análise mais aprofundada</h3>
            <p>Mais métricas, análise lateral, relatórios detalhados e histórico — em desenvolvimento.</p>
          </div>
          <button className="btn gold" id="premiumBtn">Conhecer versão Plus ↗</button>
        </section>

        <div className="sectionhead">
          <div>
            <h2>Do retrato à leitura</h2>
            <p>Um fluxo simples, com os limites da análise visíveis em cada etapa.</p>
          </div>
        </div>
        <section className="steps" aria-label="Como funciona">
          <article className="step">
            <div className="step-num">PASSO 01</div>
            <h3>Envie uma foto</h3>
            <p>Comece com uma imagem frontal nítida, bem iluminada e sem filtros.</p>
          </article>
          <article className="step">
            <div className="step-num">PASSO 02</div>
            <h3>Detecte referências</h3>
            <p>O sistema localiza pontos faciais e estima relações geométricas na imagem.</p>
          </article>
          <article className="step">
            <div className="step-num">PASSO 03</div>
            <h3>Leia o resultado</h3>
            <p>Veja as medidas calculadas, como são obtidas e quais fatores podem afetá-las.</p>
          </article>
        </section>
        <section className="manifesto">
          <div>
            <h2>Dados, não promessas.</h2>
            <p>
              A Visus Labs está sendo desenvolvida para apresentar medidas compreensíveis, explicar
              suas limitações e evitar transformar estimativas de uma foto em conclusões absolutas
              sobre aparência.
            </p>
          </div>
          <button className="btn" id="scrollUploadSecondary">Experimentar análise ↗</button>
        </section>
        <section className="features">
          <div className="feature">
            <div className="ico">⌁</div>
            <h3>Métricas explicáveis</h3>
            <p>Veja o que foi medido e como interpretar cada estimativa, sem notas misteriosas.</p>
          </div>
          <div className="feature">
            <div className="ico">◈</div>
            <h3>Privacidade em primeiro lugar</h3>
            <p>
              A foto selecionada é processada no navegador; o modelo e os arquivos de execução são
              baixados de serviços externos. A imagem não é enviada por este código a um backend.
            </p>
          </div>
          <div className="feature">
            <div className="ico">↗</div>
            <h3>Design responsivo</h3>
            <p>Interface pensada para celular e desktop, com foco em leitura e navegação simples.</p>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="wrap">
          VISUS LABS · Protótipo de produto · © 2026
          <br />
          <span>
            Não é diagnóstico médico, não determina atratividade universal e não deve ser usado para
            decisões sobre saúde ou identidade.
          </span>
        </div>
      </footer>
    </>
  );
}
