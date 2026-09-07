/**
 * Camada fina de tracking de conversão.
 *
 * Não acopla o site a um provedor: envia o evento para o que estiver presente
 * na página (Umami, Google Tag Manager / GA4) e não faz nada quando não há
 * analytics carregado — inclusive em desenvolvimento.
 */

type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (event: string, props?: EventProps) => void };
    dataLayer?: unknown[];
  }
}

export type ConversionEvent =
  | "cta_hero"
  | "cta_email"
  | "cta_service"
  | "cta_case"
  | "lead_submit"
  | "lead_submit_error";

export function track(event: ConversionEvent, props?: EventProps) {
  if (typeof window === "undefined") return;

  try {
    window.umami?.track(event, props);
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...props });
    }
  } catch {
    /* nunca deixar o tracking quebrar a interação do usuário */
  }
}
