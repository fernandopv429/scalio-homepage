/**
 * Meta Pixel (navegador) + Conversions API (servidor).
 *
 * O mesmo evento sai pelos dois caminhos com o mesmo `eventId`; a Meta
 * deduplica o par, então a conversão conta uma vez só e sobrevive a
 * bloqueador de anúncio ou falha do Pixel.
 *
 * O Pixel só existe na página quando `VITE_META_PIXEL_ID` está definido
 * (o id é público). O token do CAPI fica apenas no servidor.
 */

const CAPI_ENDPOINT = (import.meta.env.VITE_META_CAPI_ENDPOINT as string) || "/api/meta/capi";

export type MetaEvent = "Lead" | "Contact" | "CompleteRegistration" | "Schedule" | "ViewContent";

interface MetaUser {
  email?: string;
  phone?: string;
  name?: string;
}

interface MetaOptions {
  user?: MetaUser;
  customData?: Record<string, string | number | boolean>;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function newEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `evt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Cookies que a Meta usa para casar o evento com o clique/sessão do anúncio. */
function readCookie(name: string) {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function trackMeta(event: MetaEvent, { user, customData }: MetaOptions = {}) {
  if (typeof window === "undefined") return;

  const eventId = newEventId();

  try {
    window.fbq?.("track", event, customData ?? {}, { eventID: eventId });
  } catch {
    /* o Pixel nunca pode quebrar a interação */
  }

  try {
    void fetch(CAPI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // keepalive: o envio sobrevive à navegação disparada logo em seguida
      // (por exemplo o mailto: do formulário).
      keepalive: true,
      body: JSON.stringify({
        eventName: event,
        eventId,
        sourceUrl: window.location.href,
        user: { ...user, fbp: readCookie("_fbp"), fbc: readCookie("_fbc") },
        customData,
      }),
    }).catch(() => {
      /* sem servidor de CAPI (deploy estático) o evento só vai pelo Pixel */
    });
  } catch {
    /* idem */
  }
}

/** O campo de contato do formulário aceita e-mail ou telefone. */
export function splitContact(contact: string): MetaUser {
  return contact.includes("@") ? { email: contact } : { phone: contact };
}
