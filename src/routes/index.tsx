import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Visus Labs — Análise facial rigorosa" },
      {
        name: "description",
        content:
          "Análise facial que decompõe geometria, proporções e critérios estéticos transparentes em quatro pilares.",
      },
      { property: "og:title", content: "Visus Labs — Análise facial rigorosa" },
      { property: "og:description", content: "Harmonia, dimorfismo, angularidade e características em métricas explicáveis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#050505" },
    ],
  }),
  component: Index,
});

function Index() {
  const { user } = useAuth();
  const cta = user ? "/analise" : "/auth";
  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <section className="hero">
          <div>
            <div className="eyebrow">ANÁLISE FACIAL · VISUS LABS</div>
            <h1>
              Título de teste
            </h1>
            <p>
              Decompomos o rosto em dezenas de medidas geométricas, cada uma com faixa de referência,
              nota e explicação. Nenhum número mágico: você vê exatamente o que foi medido.
            </p>
            <div className="hero-actions">
              <Link to={cta} className="btn primary" style={{ textDecoration: "none" }}>
                {user ? "Começar análise ↗" : "Criar conta e começar ↗"}
              </Link>
              <Link to="/metodologia" className="btn" style={{ textDecoration: "none" }}>Conhecer o método</Link>
            </div>
            <div className="note">Estimativas 2D não definem beleza, saúde ou valor pessoal.</div>
          </div>
          <div className="hero-visual">
            <div className="float f1">MÉTRICAS<b>34 medidas frontais</b></div>
            <div className="orb"><div className="faceicon">◎</div></div>
            <div className="float f2">VISUS ENGINE<b>6 níveis por medida</b></div>
          </div>
        </section>

        <div className="sectionhead">
          <div>
            <h2>Quatro pilares, avaliados separadamente</h2>
            <p>A nota geral nunca esconde as medidas individuais.</p>
          </div>
          <span className="tag">MÉTODO PRÓPRIO</span>
        </div>
        <section className="pillars" aria-label="Pilares da análise">
          <article className="pillar"><div className="pillar-num">01 / HARM · 32%</div><h3>Harmonia</h3><p>Terços faciais, proporções do rosto, olhos, nariz, boca e mandíbula.</p></article>
          <article className="pillar"><div className="pillar-num">02 / MISC · 26%</div><h3>Características</h3><p>Traços gerais e detalhes que complementam a leitura estrutural.</p></article>
          <article className="pillar"><div className="pillar-num">03 / ANGU · 22%</div><h3>Angularidade</h3><p>Ângulos de mandíbula, queixo, olhos e contornos.</p></article>
          <article className="pillar"><div className="pillar-num">04 / DIMO · 20%</div><h3>Dimorfismo</h3><p>Características associadas ao padrão masculino ou feminino, sem compensações cruzadas.</p></article>
        </section>

        <div className="sectionhead">
          <div><h2>Do retrato ao laudo</h2><p>Um fluxo simples, com os limites visíveis em cada etapa.</p></div>
        </div>
        <section className="steps" aria-label="Como funciona">
          <article className="step"><div className="step-num">PASSO 01</div><h3>Crie sua conta</h3><p>Entre com Google, Apple ou e-mail para guardar seu histórico.</p></article>
          <article className="step"><div className="step-num">PASSO 02</div><h3>Envie uma foto</h3><p>Frontal, nítida, bem iluminada e sem filtros.</p></article>
          <article className="step"><div className="step-num">PASSO 03</div><h3>Leia o relatório</h3><p>Cada medida com sua faixa ideal, nota e explicação.</p></article>
        </section>

        <section className="manifesto">
          <div>
            <h2>Dados, não promessas.</h2>
            <p>Desvios reais recebem notas reais. Sem notas de consolo, sem inflação artificial — e com a distinção clara entre medida, inferência e convenção estética.</p>
          </div>
          <Link to={cta} className="btn" style={{ textDecoration: "none" }}>Experimentar análise ↗</Link>
        </section>

        <section className="features">
          <div className="feature"><div className="ico">⌁</div><h3>Métricas explicáveis</h3><p>Veja o que foi medido e como cada nota foi calculada.</p></div>
          <div className="feature"><div className="ico">◈</div><h3>Foto processada no navegador</h3><p>A detecção de pontos faciais roda no seu dispositivo.</p></div>
          <div className="feature"><div className="ico">↗</div><h3>Histórico na sua conta</h3><p>Seus laudos ficam guardados para comparar ao longo do tempo.</p></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
