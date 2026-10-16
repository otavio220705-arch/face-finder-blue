import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/metodologia")({
  head: () => ({
    meta: [
      { title: "Metodologia — Visus Labs" },
      { name: "description", content: "Como a Visus Labs mede o rosto: pilares, pesos, seis níveis de nota e limites de uma foto 2D." },
      { property: "og:title", content: "Metodologia — Visus Labs" },
      { property: "og:description", content: "Pilares, pesos e régua de seis níveis explicados com transparência." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Metodologia,
});

const levels = [
  ["Nível 1", "10.0", "Dentro da faixa ideal", "lv-g1"],
  ["Nível 2", "9.9 – 8.0", "Muito próximo do ideal", "lv-g2"],
  ["Nível 3", "7.9 – 6.5", "Próximo do ideal", "lv-g3"],
  ["Nível 4", "6.4 – 4.5", "Atenção moderada", "lv-y"],
  ["Nível 5", "4.4 – 2.0", "Desfavorável", "lv-r"],
  ["Nível 6", "1.9 – 0.0", "Desvio severo", "lv-r2"],
];

function Metodologia() {
  return (
    <>
      <SiteHeader />
      <main className="wrap methodology-page">
        <section className="hero editorial-heading">
          <div>
            <div className="eyebrow">METODOLOGIA</div>
            <h1>Transparência <span>em cada número.</span></h1>
            <p>
              Pontos faciais detectados na foto são convertidos em proporções — nunca em pixels absolutos —
              e cada proporção é comparada a uma faixa de referência. A nota cai continuamente conforme a
              medida se afasta do ideal.
            </p>
          </div>
        </section>

        <div className="sectionhead"><div><h2>Quatro pilares</h2><p>Pesos provisórios, sujeitos a validação.</p></div></div>
        <section className="pillars">
          <article className="pillar"><div className="pillar-num">HARM · 32%</div><h3>Harmonia</h3><p>34 medidas frontais, incluindo terços faciais e proporções do rosto.</p></article>
          <article className="pillar"><div className="pillar-num">MISC · 26%</div><h3>Características</h3><p>Traços gerais complementares.</p></article>
          <article className="pillar"><div className="pillar-num">ANGU · 22%</div><h3>Angularidade</h3><p>Ângulos e contornos estruturais.</p></article>
          <article className="pillar"><div className="pillar-num">DIMO · 20%</div><h3>Dimorfismo</h3><p>Avaliado à parte, sem compensar outros pilares.</p></article>
        </section>

        <div className="sectionhead"><div><h2>Régua de seis níveis</h2><p>Aplicada a todas as medidas. Sem piso artificial.</p></div></div>
        <section className="panel">
          <table className="levels">
            <tbody>
              {levels.map(([n, r, d, c]) => (
                <tr key={n}><td><span className={"dot " + c} /> {n}</td><td className="num">{r}</td><td className="muted">{d}</td></tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="features">
          <div className="feature"><div className="ico">∑</div><h3>Sem média simples</h3><p>A nota geral considera a dispersão entre medidas: um gargalo grave não é escondido pelas demais.</p></div>
          <div className="feature"><div className="ico">◇</div><h3>Medida, inferência, convenção</h3><p>Cada item indica se é cálculo geométrico, estimativa ou critério estético de referência.</p></div>
          <div className="feature"><div className="ico">!</div><h3>Limites da foto 2D</h3><p>Pose, lente, expressão e cabelo afetam os resultados. Não é diagnóstico médico.</p></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
