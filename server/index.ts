import express, { type Request } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { isAllowedEvent, isConfigured, sendEvent } from "./meta-capi.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Limite simples por IP para o relay do CAPI, em memória. */
const RATE_LIMIT = { max: 30, windowMs: 5 * 60 * 1000 };
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    if (hits.size > 5000) {
      hits.forEach((value, key) => {
        if (now > value.resetAt) hits.delete(key);
      });
    }
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT.max;
}

function clientIp(req: Request) {
  const forwarded = req.headers["x-forwarded-for"];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0];
  return (first || req.ip || "").trim();
}

const str = (value: unknown, max = 300) =>
  typeof value === "string" && value.trim() ? value.trim().slice(0, max) : undefined;

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Necessário para ler o IP real atrás de CDN/proxy (usado pelo CAPI).
  app.set("trust proxy", true);
  app.disable("x-powered-by");

  // Healthcheck do container (usado pelo Coolify/Docker).
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, uptime: Math.round(process.uptime()) });
  });

  // ---------------------------------------------------------------- Meta CAPI
  app.get("/api/meta/capi/health", (_req, res) => {
    res.json({ configured: isConfigured() });
  });

  app.post("/api/meta/capi", express.json({ limit: "10kb" }), async (req, res) => {
    if (rateLimited(clientIp(req) || "desconhecido")) {
      return res.status(429).json({ ok: false, error: "rate_limited" });
    }

    const body = (req.body ?? {}) as Record<string, unknown>;
    const eventName = body.eventName;
    const eventId = str(body.eventId, 100);

    if (!isAllowedEvent(eventName)) {
      return res.status(400).json({ ok: false, error: "event_not_allowed" });
    }
    if (!eventId) {
      return res.status(400).json({ ok: false, error: "missing_event_id" });
    }

    const user = (body.user ?? {}) as Record<string, unknown>;
    const customData = (body.customData ?? {}) as Record<string, unknown>;

    const result = await sendEvent({
      eventName,
      eventId,
      sourceUrl: str(body.sourceUrl, 500),
      user: {
        email: str(user.email, 200),
        phone: str(user.phone, 40),
        name: str(user.name, 120),
        fbp: str(user.fbp, 120),
        fbc: str(user.fbc, 300),
        clientIp: clientIp(req),
        userAgent: str(req.headers["user-agent"], 500),
      },
      customData,
    });

    if (!result.ok) {
      console.error(`[meta-capi] falha ao enviar ${eventName}: ${result.status} ${result.error}`);
      return res.status(502).json({ ok: false, error: "upstream_error" });
    }

    return res.json({ ok: true });
  });

  // ------------------------------------------------------------------ estático
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Rotas do cliente caem no index.html (SPA), menos /api.
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api/")) return res.status(404).json({ ok: false, error: "not_found" });
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`Meta CAPI: ${isConfigured() ? "configurado" : "sem credenciais (eventos ignorados)"}`);
  });

  // O Docker manda SIGTERM no deploy: fechar limpo evita esperar o timeout.
  const shutdown = (signal: string) => {
    console.log(`${signal} recebido, encerrando`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10_000).unref();
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

startServer().catch(console.error);
