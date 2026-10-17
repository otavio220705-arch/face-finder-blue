import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export function SiteHeader() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();
  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }
  return (
    <header>
      <div className="wrap nav">
        <Link to="/" className="brand">
          <span className="mark">V</span> VISUS{" "}
          <span className="brand-labs">LABS</span>
        </Link>
        <nav className="navlinks">
          <Link to="/analise" activeProps={{ className: "active" }}>Análise</Link>
          <Link to="/relatorio" activeProps={{ className: "active" }}>Relatório</Link>
          <Link to="/metodologia" activeProps={{ className: "active" }}>Metodologia</Link>
        </nav>
        <div className="navright">
          {ready && user ? (
            <>
              <span className="tag userTag" title={user.email ?? ""}>{user.email}</span>
              <Button variant="visus" className="btn" onClick={signOut}>Sair</Button>
            </>
          ) : (
            <Link to="/auth" className="btn primary" style={{ textDecoration: "none" }}>Entrar</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        VISUS LABS · © 2026
        <br />
        <span>
          Não é diagnóstico médico, não determina atratividade universal e não deve ser usado para
          decisões sobre saúde ou identidade.
        </span>
      </div>
    </footer>
  );
}
