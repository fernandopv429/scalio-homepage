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

| Variável                    | Efeito quando ausente                                      |
| --------------------------- | ---------------------------------------------------------- |
| `VITE_SITE_URL`             | canonical/OG/JSON-LD ficam relativos; sitemap não é gerado |
| `VITE_LEAD_ENDPOINT`        | formulário cai para envio por e-mail                       |
| `VITE_ANALYTICS_ENDPOINT`   | script de analytics não é injetado                         |
| `VITE_ANALYTICS_WEBSITE_ID` | script de analytics não é injetado                         |
| `VITE_META_PIXEL_ID`        | Meta Pixel não é carregado                                 |
| `META_CAPI_DATASET_ID`      | relay do Conversions API ignora os eventos                 |
| `META_CAPI_ACCESS_TOKEN`    | relay do Conversions API ignora os eventos                 |

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

Sem `VITE_LEAD_ENDPOINT` o envio abre o cliente de e-mail e mostra um link
de fallback para `comercial@nexusdevhub.com` — nunca descarta o lead em
silêncio. Com o endpoint configurado, o formulário faz `POST` JSON:

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

## Meta: Pixel + Conversions API

A conversão é enviada por dois caminhos com o **mesmo `eventId`**, e a Meta
deduplica o par: o Pixel no navegador e o Conversions API a partir do
servidor. Se o Pixel for bloqueado (bloqueador de anúncios, ITP, falha de
rede), o evento ainda chega pelo servidor.

Eventos enviados:

| Evento    | Quando                                                |
| --------- | ----------------------------------------------------- |
| `PageView`| carregamento da página (só Pixel)                     |
| `Lead`    | envio do formulário de diagnóstico (Pixel + CAPI)     |
| `Contact` | clique no e-mail comercial, na seção de contato e no FAQ |

### Segurança do token

O `META_CAPI_ACCESS_TOKEN` é **segredo de servidor**:

- fica só em variável de ambiente, nunca no repositório;
- nunca use o prefixo `VITE_` nele — isso o colocaria dentro do bundle
  que qualquer visitante baixa;
- o servidor nunca o registra em log (nem em caso de erro da Meta);
- se ele vazar, revogue em Gerenciador de Eventos → Configurações →
  Conversions API → gerar novo token.

O id do conjunto de dados (`2796414304068060`) não é segredo: ele aparece
no HTML por definição, porque o Pixel roda no navegador.

### Dados enviados

O relay normaliza e aplica SHA-256 antes de enviar, como a Meta exige:
e-mail em minúsculas, telefone só com dígitos e código do país (números
brasileiros de 10-11 dígitos recebem o `55`), nome em minúsculas. IP,
user-agent e os cookies `_fbp`/`_fbc` seguem sem hash, conforme a
especificação. Nenhum dado em texto puro sai do servidor.

### Testando

```bash
# 1. Pegue o código em Gerenciador de Eventos → Testar eventos
META_CAPI_TEST_EVENT_CODE=TESTxxxxx pnpm start

# 2. Envie o formulário no site e veja o evento aparecer na aba de teste.

# 3. Health check do relay (não expõe segredo):
curl http://localhost:3000/api/meta/capi/health   # {"configured":true}
```

Para conferir token e dataset direto na API da Meta:

```bash
curl -s "https://graph.facebook.com/v21.0/<DATASET_ID>?fields=id,name&access_token=$META_CAPI_ACCESS_TOKEN"
```

### Consentimento (LGPD)

O site não tem banner de consentimento. Pixel e Conversions API enviam
dados pessoais (mesmo hasheados) para a Meta assim que a página carrega.
Avalie com o jurídico se é necessário um banner que só carregue o Pixel e
só dispare o relay após o aceite.

## Deploy

O build gera `dist/public` (estático) e `dist/index.js` (Express).

- **Host estático** (Vercel, Netlify, Cloudflare Pages, S3): publique
  `dist/public` e configure rewrite de SPA — todas as rotas para
  `/index.html`, senão links diretos como `/404` caem no 404 do host.
  Atenção: sem Node não existe `/api/meta/capi`, então **só o Pixel
  funciona** — o Conversions API exige o servidor ou uma função
  serverless equivalente.
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
