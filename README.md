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

O build gera `dist/public` (estático) e `dist/index.js` (Express). O
`Dockerfile` na raiz empacota os dois: build multi-stage e imagem final só
com as dependências de produção.

### Build-time x runtime — a distinção que quebra deploys

| Classe        | Lidas em | Onde configurar                                  |
| ------------- | -------- | ------------------------------------------------ |
| `VITE_*`      | build    | **build args** — ficam gravadas no bundle        |
| `META_CAPI_*` | runtime  | env do container — nunca entram na imagem        |

Se `VITE_META_PIXEL_ID` for configurada só como env de runtime, o Pixel
**não aparece no HTML**: naquele momento o bundle já foi gerado. O mesmo
vale para `VITE_SITE_URL` (canonical, Open Graph, sitemap).

### Coolify

1. **New Resource → Application → Public/Private Repository**
   - Repositório: `fernandopv429/scalio-homepage`
   - Branch: a que você for publicar (hoje `main` depois do merge)
2. **Build Pack: `Dockerfile`** (não use Nixpacks — o Dockerfile já cuida
   do pnpm, do patch do wouter e do estágio de produção)
3. **Ports Exposes: `3000`**
4. **Environment Variables** — marque o checkbox *Build Variable* nas
   `VITE_*` e deixe as outras como runtime:

   | Variável                    | Valor                        | Build? |
   | --------------------------- | ---------------------------- | ------ |
   | `VITE_SITE_URL`             | `https://nexusdevhub.com`    | ✅ sim |
   | `VITE_META_PIXEL_ID`        | `2796414304068060`           | ✅ sim |
   | `META_CAPI_DATASET_ID`      | `2796414304068060`           | não    |
   | `META_CAPI_ACCESS_TOKEN`    | *(token do CAPI)*            | não    |
   | `META_CAPI_TEST_EVENT_CODE` | `TESTxxxxx` só durante teste | não    |

5. **Healthcheck**: path `/api/health`, porta `3000`
6. **Domains**: `https://nexusdevhub.com` (o Coolify cuida do certificado
   via Traefik). Estando atrás do Cloudflare, use SSL/TLS em **Full
   (strict)** — em *Flexible* dá loop de redirecionamento.
7. Deploy. O log final deve mostrar:

   ```
   Server running on http://localhost:3000/
   Meta CAPI: configurado
   ```

### Validando depois do deploy

```bash
curl https://nexusdevhub.com/api/health          # {"ok":true,...}
curl https://nexusdevhub.com/api/meta/capi/health # {"configured":true}

# Evento de teste real (com META_CAPI_TEST_EVENT_CODE preenchido ele cai
# na aba "Testar eventos" e não suja os dados de produção):
curl -X POST https://nexusdevhub.com/api/meta/capi \
  -H 'Content-Type: application/json' \
  -d '{"eventName":"Lead","eventId":"teste-1","user":{"email":"teste@exemplo.com"}}'
```

Confira também no HTML publicado que o Pixel e o canonical entraram:

```bash
curl -s https://nexusdevhub.com | grep -o "fbq('init','[0-9]*')"
curl -s https://nexusdevhub.com | grep -o '<link rel="canonical"[^>]*>'
```

Se vierem vazios, as `VITE_*` não foram marcadas como build variable.

### Rodando o container local

```bash
docker build -t scalio-homepage \
  --build-arg VITE_SITE_URL=https://nexusdevhub.com \
  --build-arg VITE_META_PIXEL_ID=2796414304068060 .

docker run --rm -p 3000:3000 \
  -e META_CAPI_DATASET_ID=2796414304068060 \
  -e META_CAPI_ACCESS_TOKEN=... \
  scalio-homepage
```

### Outros hosts

- **Host estático** (Vercel, Netlify, Cloudflare Pages, S3): publique
  `dist/public` e configure rewrite de SPA — todas as rotas para
  `/index.html`, senão links diretos como `/404` caem no 404 do host.
  Atenção: sem Node não existe `/api/meta/capi`, então **só o Pixel
  funciona** — o Conversions API exige o servidor ou uma função
  serverless equivalente.
- **Node sem Docker**: `pnpm build && pnpm start`.

`robots.txt` e `sitemap.xml` são gerados no build (o sitemap só quando
`VITE_SITE_URL` está definido).

## Notas de manutenção

- O ferramental da plataforma Manus (`vite-plugin-manus-runtime`,
  `jsx-loc`, coletor de logs, proxy de storage) roda **somente em
  desenvolvimento**. Em produção ele adicionava ~367 KB inline no
  `index.html`.
- Não há testes automatizados no projeto.
