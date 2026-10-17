import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { SiteHeader } from "@/components/SiteHeader";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — Visus Labs" },
      { name: "description", content: "Entre ou crie sua conta Visus Labs com Google, Apple ou e-mail." },
      { property: "og:title", content: "Entrar — Visus Labs" },
      { property: "og:description", content: "Acesse sua conta para salvar análises e laudos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function translate(msg: string) {
  if (/invalid login/i.test(msg)) return "E-mail ou senha incorretos.";
  if (/already registered/i.test(msg)) return "Este e-mail já tem conta. Use “Entrar”.";
  if (/email not confirmed/i.test(msg)) return "Confirme seu e-mail pelo link enviado antes de entrar.";
  if (/password/i.test(msg) && /6|least/i.test(msg)) return "A senha precisa ter pelo menos 6 caracteres.";
  return msg;
}

function AuthPage() {
  const navigate = useNavigate();
  const { user, ready } = useAuth();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null);

  useEffect(() => {
    if (ready && user) navigate({ to: "/analise", replace: true });
  }, [ready, user, navigate]);

  async function social(provider: "google" | "apple") {
    setMsg(null);
    const r = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin + "/auth" });
    if (r.error) setMsg({ text: "Não foi possível entrar agora. Tente novamente.", error: true });
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg({ text: translate(error.message), error: true });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/auth" },
      });
      if (error) setMsg({ text: translate(error.message), error: true });
      else if (!data.session) setMsg({ text: "Conta criada. Enviamos um link de confirmação para o seu e-mail." });
    }
    setBusy(false);
  }

  return (
    <>
      <SiteHeader />
      <main className="wrap authwrap">
        <div className="panel authcard">
          <div className="eyebrow">{mode === "in" ? "BEM-VINDO DE VOLTA" : "CRIAR CONTA"}</div>
          <h2 style={{ margin: "10px 0 6px" }}>{mode === "in" ? "Entrar na Visus Labs" : "Comece sua análise"}</h2>
          <p className="muted" style={{ fontSize: 13, marginTop: 0 }}>Seus laudos e histórico ficam salvos na sua conta.</p>
          <Button variant="visus" className="btn full social" onClick={() => social("google")}>Continuar com Google</Button>
          <Button variant="visus" className="btn full social" onClick={() => social("apple")}>Continuar com Apple</Button>
          <div className="divider"><span>ou com e-mail</span></div>
          <form onSubmit={submit} className="authform">
            <input type="email" required placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="E-mail" />
            <input type="password" required minLength={6} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Senha" />
            <Button variant="visus" className="btn primary full" disabled={busy}>
              {busy ? "Aguarde…" : mode === "in" ? "Entrar" : "Criar conta"}
            </Button>
          </form>
          {msg && <div className={"toast" + (msg.error ? " error" : "")} style={{ display: "block" }}>{msg.text}</div>}
          <p className="muted" style={{ fontSize: 13, textAlign: "center" }}>
            {mode === "in" ? "Ainda não tem conta? " : "Já tem conta? "}
            <Button variant="visus" type="button" className="linkbtn" onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(null); }}>
              {mode === "in" ? "Criar conta" : "Entrar"}
            </Button>
          </p>
        </div>
      </main>
    </>
  );
}
