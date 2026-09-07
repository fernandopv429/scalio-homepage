# syntax=docker/dockerfile:1

# =============================================================================
# Homepage Scalio — imagem de produção (Vite build + servidor Express)
#
# ATENÇÃO às duas classes de variável:
#   - VITE_*        são lidas no BUILD e ficam gravadas no bundle. Precisam
#                   chegar como build args (no Coolify: "Build Variable").
#   - META_CAPI_*   são lidas em RUNTIME pelo servidor. Ficam como env normal
#                   e NUNCA entram na imagem.
# =============================================================================

# ------------------------------------------------------------------ 1. build
FROM node:22-bookworm-slim AS build

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
WORKDIR /app

# Habilita o pnpm da versão fixada em package.json#packageManager.
COPY package.json pnpm-lock.yaml ./
# `patches/` precisa existir antes do install: wouter é uma dependência patchada.
COPY patches ./patches
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .

# Variáveis de build. Sem elas o site sobe funcionando, só sem Pixel,
# sem canonical/OG absolutos e sem sitemap.
ARG VITE_SITE_URL=""
ARG VITE_META_PIXEL_ID=""
ARG VITE_META_CAPI_ENDPOINT=""
ARG VITE_LEAD_ENDPOINT=""
ARG VITE_ANALYTICS_ENDPOINT=""
ARG VITE_ANALYTICS_WEBSITE_ID=""
ENV VITE_SITE_URL=$VITE_SITE_URL \
    VITE_META_PIXEL_ID=$VITE_META_PIXEL_ID \
    VITE_META_CAPI_ENDPOINT=$VITE_META_CAPI_ENDPOINT \
    VITE_LEAD_ENDPOINT=$VITE_LEAD_ENDPOINT \
    VITE_ANALYTICS_ENDPOINT=$VITE_ANALYTICS_ENDPOINT \
    VITE_ANALYTICS_WEBSITE_ID=$VITE_ANALYTICS_WEBSITE_ID

RUN pnpm check && pnpm build

# ---------------------------------------------------------------- 2. runtime
FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production \
    COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    PORT=3000
WORKDIR /app

# Só as dependências de produção (o bundle do servidor mantém o express externo).
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN corepack enable \
 && pnpm install --frozen-lockfile --prod --ignore-scripts \
 && pnpm store prune \
 && rm -rf /root/.cache /root/.local/share/pnpm/store

COPY --from=build /app/dist ./dist

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "dist/index.js"]
