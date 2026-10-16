# Visus Labs — Contemporary Dark Classicism

## Escopo
Reformular exclusivamente a apresentação visual das cinco páginas existentes: Início, Entrar, Análise, Relatório e Metodologia. Preservar textos técnicos, conteúdo, links, autenticação, processamento de fotos, métricas, fórmulas e estados de erro. Não implementar funcionalidades futuras anunciadas no site.

## Direção de arte
- **Paleta:** preto profundo `#090909`, superfícies `#171717`, divisórias `#393936`, pedra/prata `#99958E` e marfim `#E8E3DA`, com ajustes de contraste quando necessário. Eliminar acentos azuis e fundos luminosos; preservar cores discretas que identificam os seis níveis existentes.
- **Tipografia:** Instrument Serif para títulos editoriais e momentos expressivos; Manrope para interface, textos técnicos e dados. Números alinhados com largura tabular. Sem serifadas nas tabelas, controles ou métricas.
- **Composição:** seções abertas, divisórias finas e alinhamento rigoroso; reduzir cartões repetitivos e botões excessivamente arredondados. Transições suaves respeitando redução de movimento.
- **Imagem:** uma única composição original de escultura clássica de mármore com chiaroscuro, reservada à abertura da página inicial. Sem colagem, figuras religiosas ou imagens decorativas nos espaços de análise e resultados. As referências mencionadas ainda não estão disponíveis nesta mensagem; a composição seguirá a direção escrita, sem reutilizar imagens antigas como referências novas.

## Aplicação por página
### Início — expressão artística controlada
Substituir a ilustração abstrata circular por uma abertura ampla com escultura integrada ao fundo, sem moldura de cartão. Sobrepor o conteúdo existente numa região de leitura tranquila, mantendo o nome Visus Labs em destaque e todas as chamadas atuais. Os indicadores “34 medidas frontais” e “6 níveis por medida” passam a anotações editoriais discretas. Deixar o início da próxima seção visível.

Apresentar os quatro pilares como colunas editoriais separadas por linhas; os três passos como sequência numerada aberta. Transformar “Dados, não promessas.” em seção tipográfica, não cartão. Manter todos os textos e destinos dos links.

### Entrar — sóbrio e acolhedor
Formulário de acesso com hierarquia mais clara, tons de carvão e marfim, campos legíveis e foco visível. Preservar Google, Apple, e-mail/senha, alternância entre cadastro e login, mensagens e redirecionamentos. Sem imagem decorativa adicional.

### Análise — precisão técnica
Organizar as duas áreas atuais como estação de trabalho: envio da foto e leitura preliminar, com separação sutil e tipografia funcional. Preservar rigorosamente a estrutura da foto, a sobreposição dos pontos, os controles, os identificadores e todos os estados existentes. Nenhuma escultura ou gravura.

### Relatório — editorial científico
Reestilizar o estado vazio atual e os quatro pilares com números alinhados, divisórias e espaço equilibrado. Preservar “em breve” e a ausência de resultados: não criar notas, dados ou laudos fictícios.

### Metodologia — leitura editorial
Título serifado seletivo, largura confortável para texto, pilares abertos e tabela de níveis refinada, adaptada a telas estreitas. Preservar literalmente pesos, intervalos, explicações e limites científicos.

## Detalhes técnicos
- Manter TanStack Router, a lógica imperativa do analisador e a ausência de Tailwind preflight.
- Centralizar cores, tipografia e estados em tokens semânticos; harmonizar os tokens de `src/styles.css` com os estilos do Visus Labs.
- Reorganizar apenas o necessário nos elementos de apresentação. Não alterar integrações, dados, código de autenticação ou cálculos.
- Carregar fontes no cabeçalho compartilhado e importar a imagem gerada localmente no projeto.
- Preservar os metadados próprios de todas as páginas.

## Verificação
- Executar os testes de navegação existentes.
- Conferir visualmente as cinco páginas em computador e celular, incluindo navegação, texto, tabela, formulários e ausência de sobreposição.
- Verificar alternância de login/cadastro e estados existentes da análise, usando uma sessão real disponível para as páginas protegidas, sem modificar configurações de acesso.
- Conferir erros de execução e a compilação antes de concluir. Informar qualquer verificação impedida por acesso ou serviço externo.