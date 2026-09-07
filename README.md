# Scalio — Homepage

Landing page institucional da Scalio (consultoria de transformação digital).
Single-page em React + Vite, com sistema de design próprio em CSS.

## Stack

| Camada    | Escolha                                              |
| --------- | ---------------------------------------------------- |
| UI        | React 19 + TypeScript                                |
| Build     | Vite 7                                               |
| Estilo    | CSS próprio em `client/src/index.css` + Tailwind 4   |
| Rotas     | wouter (`/` e fallback 404)                          |
| Ícones    | lucide-react                                         |
| Servidor  | Express, apenas para servir o build estático         |

## Rodando localmente

```bash
pnpm install
cp .env.example .env   # opcional
pnpm dev               # http://localhost:3000
```

Outros comandos:

```bash
pnpm check     # typecheck (tsc --noEmit)
pnpm build     # build de produção em dist/
pnpm start     # serve dist/ com Express (NODE_ENV=production)
pnpm format    # prettier
```

## Variáveis de ambiente

Todas são opcionais — veja `.env.example`. O site sobe sem nenhuma delas.

| Variável                    | Efeito quando ausente                                  |
| --------------------------- | ------------------------------------------------------ |
| `VITE_SITE_URL`             | canonical/OG/JSON-LD ficam relativos; sitemap não é gerado |
| `VITE_LEAD_ENDPOINT`        | formulário cai para e-mail/WhatsApp                    |
| `VITE_ANALYTICS_ENDPOINT`   | script de analytics não é injetado                     |
| `VITE_ANALYTICS_WEBSITE_ID` | script de analytics não é injetado                      |

Nenhum placeholder de env vaza para o HTML publicado: quando a variável não
existe, a tag simplesmente não é gerada.

## Estrutura

```
client/
  index.html            <head>: SEO, Open Graph, JSON-LD, fontes
  public/               favicon, og-image, apple-touch-icon, logo-scalio.png
  src/
    content/site.ts     todo o texto e os dados da página
    sections/           uma seção da homepage por arquivo
    components/         Logo, ErrorBoundary
    lib/analytics.ts    camada de tracking (Umami / GTM / no-op)
    index.css           design system (tokens + componentes)
server/index.ts         Express que serve dist/public
```

Para revisar texto, mexa em `client/src/content/site.ts`. Para mexer em
layout, na seção correspondente em `client/src/sections/`.

## Logo

`client/src/components/Logo.tsx` usa `/logo-scalio.png` e, se o arquivo não
existir, desenha um monograma em SVG — o header nunca fica com imagem
quebrada. **Para usar a logo oficial, coloque o PNG em
`client/public/logo-scalio.png`** (fundo transparente, ~120×120 ou maior).

## Formulário de diagnóstico

Sem `VITE_LEAD_ENDPOINT` o envio abre o cliente de e-mail e mostra links de
fallback (e-mail e WhatsApp) — nunca descarta o lead em silêncio. Com o
endpoint configurado, o formulário faz `POST` JSON:

```json
{
  "name": "...",
  "company": "...",
  "contact": "...",
  "area": "...",
  "message": "...",
  "source": "homepage",
  "sentAt": "2026-01-01T00:00:00.000Z"
}
```

## Deploy

O build gera `dist/public` (estático) e `dist/index.js` (Express).

- **Host estático** (Vercel, Netlify, Cloudflare Pages, S3): publique
  `dist/public` e configure rewrite de SPA — todas as rotas para
  `/index.html`, senão links diretos como `/404` caem no 404 do host.
- **Node**: `pnpm build && pnpm start`. O Express já faz o fallback para
  `index.html`, sem configuração extra.

`robots.txt` e `sitemap.xml` são gerados no build (o sitemap só quando
`VITE_SITE_URL` está definido).

## Notas de manutenção

- O ferramental da plataforma Manus (`vite-plugin-manus-runtime`,
  `jsx-loc`, coletor de logs, proxy de storage) roda **somente em
  desenvolvimento**. Em produção ele adicionava ~367 KB inline no
  `index.html`.
- Não há testes automatizados no projeto.
