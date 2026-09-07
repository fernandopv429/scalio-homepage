import { createHash } from "node:crypto";

/**
 * Meta Conversions API (CAPI).
 *
 * O token de acesso é segredo de servidor: fica só em `META_CAPI_ACCESS_TOKEN`
 * e nunca é enviado ao navegador, logado ou versionado. O navegador dispara o
 * mesmo evento pelo Pixel com o mesmo `eventId`, e a Meta deduplica o par.
 */

const ALLOWED_EVENTS = new Set([
  "Lead",
  "Contact",
  "CompleteRegistration",
  "Schedule",
  "ViewContent",
  "PageView",
]);

export interface CapiUser {
  email?: string;
  phone?: string;
  name?: string;
  fbp?: string;
  fbc?: string;
  clientIp?: string;
  userAgent?: string;
}

export interface CapiEvent {
  eventName: string;
  eventId: string;
  sourceUrl?: string;
  user?: CapiUser;
  customData?: Record<string, unknown>;
}

export type CapiResult =
  | { ok: true; skipped: true; reason: string }
  | { ok: true; skipped?: false; eventsReceived?: number; fbTraceId?: string }
  | { ok: false; status: number; error: string };

export function isAllowedEvent(name: unknown): name is string {
  return typeof name === "string" && ALLOWED_EVENTS.has(name);
}

export function isConfigured() {
  return Boolean(process.env.META_CAPI_DATASET_ID && process.env.META_CAPI_ACCESS_TOKEN);
}

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

/** Meta exige e-mail em minúsculas e sem espaços antes do hash. */
function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

/**
 * Meta exige telefone só com dígitos e com código do país. Números brasileiros
 * digitados no formato local (10 ou 11 dígitos) recebem o 55.
 */
function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if ((digits.length === 10 || digits.length === 11) && !digits.startsWith("55")) {
    return `55${digits}`;
  }
  return digits;
}

function normalizeName(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function splitName(full: string) {
  const parts = normalizeName(full).split(" ").filter(Boolean);
  if (parts.length === 0) return {};
  return { first: parts[0], last: parts.length > 1 ? parts[parts.length - 1] : undefined };
}

function buildUserData(user: CapiUser = {}) {
  const data: Record<string, unknown> = {};

  if (user.email) {
    const email = normalizeEmail(user.email);
    if (email) data.em = [sha256(email)];
  }
  if (user.phone) {
    const phone = normalizePhone(user.phone);
    if (phone) data.ph = [sha256(phone)];
  }
  if (user.name) {
    const { first, last } = splitName(user.name);
    if (first) data.fn = [sha256(first)];
    if (last) data.ln = [sha256(last)];
  }

  // Não são hasheados: a Meta usa esses campos como estão.
  if (user.clientIp) data.client_ip_address = user.clientIp;
  if (user.userAgent) data.client_user_agent = user.userAgent;
  if (user.fbp) data.fbp = user.fbp;
  if (user.fbc) data.fbc = user.fbc;

  return data;
}

export function buildPayload(event: CapiEvent) {
  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: "website",
        ...(event.sourceUrl ? { event_source_url: event.sourceUrl } : {}),
        user_data: buildUserData(event.user),
        ...(event.customData && Object.keys(event.customData).length
          ? { custom_data: event.customData }
          : {}),
      },
    ],
  };

  const testCode = process.env.META_CAPI_TEST_EVENT_CODE;
  if (testCode) payload.test_event_code = testCode;

  return payload;
}

export async function sendEvent(event: CapiEvent): Promise<CapiResult> {
  const datasetId = process.env.META_CAPI_DATASET_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;

  if (!datasetId || !token) {
    return { ok: true, skipped: true, reason: "META_CAPI_DATASET_ID/ACCESS_TOKEN não configurados" };
  }

  const base = (process.env.META_CAPI_GRAPH_URL || "https://graph.facebook.com").replace(/\/+$/, "");
  const version = process.env.META_CAPI_VERSION || "v21.0";
  const url = `${base}/${version}/${datasetId}/events?access_token=${encodeURIComponent(token)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(event)),
      signal: controller.signal,
    });

    const body = (await response.json().catch(() => ({}))) as {
      events_received?: number;
      fbtrace_id?: string;
      error?: { message?: string };
    };

    if (!response.ok) {
      // A mensagem da Meta não contém o token; a URL nunca é logada.
      return { ok: false, status: response.status, error: body.error?.message ?? "erro desconhecido" };
    }

    return { ok: true, eventsReceived: body.events_received, fbTraceId: body.fbtrace_id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "falha de rede";
    return { ok: false, status: 0, error: message };
  } finally {
    clearTimeout(timeout);
  }
}
