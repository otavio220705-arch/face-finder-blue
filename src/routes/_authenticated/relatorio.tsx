import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/_authenticated/relatorio")({
  head: () => ({
    meta: [
      { title: "Relatório — Visus Labs" },
      { name: "description", content: "Seus laudos faciais por pilar: harmonia, características, angularidade e dimorfismo." },
      { property: "og:title", content: "Relatório — Visus Labs" },
      { property: "og:description", content: "Laudos faciais detalhados por pilar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Relatorio,
});

const pillars = [
  ["HARM", "Harmonia", "32%"],
  ["MISC", "Características", "26%"],
  ["ANGU", "Angularidade", "22%"],
  ["DIMO", "Dimorfismo", "20%"],
];

function Relatorio() {
  return (
    <>
      <SiteHeader />
      <main className="wrap report-page">
        <div className="sectionhead">
          <div>
            <h2>Seus relatórios</h2>
            <p>Nenhum laudo salvo ainda. O relatório completo por pilar está em construção.</p>
          </div>
          <span className="tag">EM BREVE</span>
        </div>
        <section className="pillars">
          {pillars.map(([code, name, w]) => (
            <article className="pillar" key={code}>
              <div className="pillar-num">{code} · {w}</div>
              <h3>{name}</h3>
              <p className="muted">Sem dados — faça uma análise.</p>
            </article>
          ))}
        </section>
        <section className="manifesto">
          <div><h2>Comece pela análise</h2><p>Envie uma foto frontal para gerar sua primeira leitura.</p></div>
          <Link to="/analise" className="btn primary" style={{ textDecoration: "none" }}>Nova análise ↗</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
