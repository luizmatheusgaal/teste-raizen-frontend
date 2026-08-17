# Design System — Verzel Events

Plataforma de eventos e ingressos inspirada na clareza e densidade de informação da Sympla, com identidade própria voltada para experiências culturais (shows, filmes, teatro).

## Conceito

- **Tom**: confiável, energético, organizado.
- **Públicos**: três papéis distintos (Organizador, Cliente, Portaria) usando a mesma base visual, diferenciados principalmente pela navegação e pelas ações disponíveis.
- **Risco estético**: uso de cantos arredondados generosos, sombras suaves e uma paleta que tem o **verde** como protagonista, equilibrado com coral e âmbar para ações e destaques.

## Paleta de Cores

| Token | Hex | Uso |
|---|---|---|
| `--color-primary` | `#16A34A` | Brand, links primários, navegação ativa, botões principais |
| `--color-primary-dark` | `#15803D` | Hover/foco em elementos primários |
| `--color-secondary` | `#FF6B6B` | CTAs de conversão, destaque de preço, ações de risco (cancelar) |
| `--color-accent` | `#FBBF24` | Ingressos, selos, badges de destaque |
| `--color-success` | `#22C55E` | Sucesso, disponível, validado |
| `--color-danger` | `#F43F5E` | Erro, inválido, recusado |
| `--color-warning` | `#F59E0B` | Alertas, pendente |
| `--color-text` | `#1E293B` | Texto principal |
| `--color-text-muted` | `#64748B` | Texto secundário, legendas |
| `--color-background` | `#F8FAFC` | Fundo geral |
| `--color-surface` | `#FFFFFF` | Cards, modais, formularios |
| `--color-border` | `#E2E8F0` | Bordas, divisores |

## Tipografia

- **Display / Títulos**: `Sora`, sans-serif. Peso 700/800. Usado em H1, H2, preços e CTAs principais.
- **Corpo**: `Inter`, sans-serif. Peso 400/500/600. Usado em parágrafos, labels, botões secundários.
- **Dados / Captions**: `Inter`, 12–14px, peso 500, cor `--color-text-muted`.

### Escala

| Nome | Tamanho | Peso | Uso |
|---|---|---|---|
| `heading-1` | 40px | 800 | Hero, título principal da página |
| `heading-2` | 32px | 700 | Títulos de seção |
| `heading-3` | 24px | 700 | Título de cards, nome do evento |
| `heading-4` | 18px | 600 | Subtítulos, seções de formulário |
| `body` | 16px | 400 | Texto corrido |
| `body-sm` | 14px | 400 | Descrições, metadados |
| `caption` | 12px | 500 | Tags, legendas, timestamps |

## Espaçamento

- Base do grid: `4px`
- Espaçamentos: `4, 8, 12, 16, 24, 32, 48, 64, 96`
- Container máximo: `1280px`
- Padding horizontal do container: `24px` mobile, `48px` desktop
- Border-radius padrão: `12px`
- Border-radius de botões: `999px` (pill) para CTAs principais; `8px` para inputs e cards

## Componentes

### Botões

- **Primary**: fundo `--color-primary`, texto branco, padding `12px 24px`, bordas arredondadas completas. Hover: `--color-primary-dark`.
- **Secondary**: fundo branco, borda `--color-border`, texto `--color-text`. Hover: fundo `--color-background`.
- **Danger**: fundo `--color-danger`, texto branco.
- **Ghost**: texto `--color-primary`, sem fundo. Hover: fundo `--color-primary` com 8% de opacidade.

### Cards de Evento

- Estrutura: imagem 16:9 arredondada no topo, conteúdo com padding `16px`.
- Informações: título, data, local, preço a partir de.
- Badge de categoria no canto superior esquerdo da imagem.
- Hover: elevação com `box-shadow: 0 12px 24px rgba(30, 41, 59, 0.08)` e leve scale `1.01`.

### Formulários

- Input: altura `48px`, borda `--color-border`, border-radius `8px`, padding horizontal `16px`.
- Label: `body-sm`, peso 600, cor `--color-text`, margin-bottom `8px`.
- Foco: borda `--color-primary`, anel de foco `2px` com opacidade 20%.
- Erro: borda `--color-danger`, mensagem abaixo em `--color-danger`.

### Badges

- Categoria: fundo `--color-primary` com 10% de opacidade, texto `--color-primary-dark`.
- Disponível: fundo `--color-success` com 10% de opacidade, texto `--color-success`.
- Esgotado: fundo `--color-text-muted` com 10% de opacidade, texto `--color-text-muted`.
- Destaque: fundo `--color-accent`, texto `--color-text`.

### Navegação

- Header fixo com fundo branco e sombra sutil.
- Logo à esquerda, busca central, ações de conta à direita.
- Menu adapta de acordo com o papel do usuário logado.

## Layout

- Grid de 12 colunas, gap `24px`.
- Mobile first: breakpoints em `640px`, `768px`, `1024px`, `1280px`.
- Cards em grid: 1 coluna mobile, 2 colunas tablet, 4 colunas desktop.

## Telas mapeadas

1. **Home** — busca, categorias, eventos em destaque.
2. **Detalhe do Evento** — informações, seleção de assento/quantidade, CTA de compra.
3. **Checkout** — resumo, pagamento simulado (aprovar/recusar), confirmação.
4. **Meus Ingressos** — lista de ingressos com QR.
5. **Validação na Portaria** — leitor de QR/manual, resultado.
6. **Criar Evento (Organizador)** — busca no catálogo externo, configuração de data, local e preço.
7. **Dashboard do Organizador** — listagem de eventos, status, estatísticas.

## Acessibilidade

- Contraste mínimo 4.5:1 para texto.
- Foco visível em todos os elementos interativos.
- Estados de erro e sucesso identificados por cor + ícone + texto.
- Botões com label descritivo e área de toque mínima de `44px`.
