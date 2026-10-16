<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Visus presentation lives in src/visus.css using semantic tokens from src/styles.css; keep Tailwind preflight disabled and preserve analyzer DOM identifiers and imperative behavior during visual changes.
- Signed-in pages live under src/routes/_authenticated/ (client-only gate redirecting to /auth); public pages stay top-level so they remain shareable.
- Keep generated artistic assets local and confined to the home composition; technical pages use the shared visual system without decorative imagery to preserve task focus.
