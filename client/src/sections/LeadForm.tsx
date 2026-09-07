import { leadAreas, mailtoUrl, site, whatsappUrl } from "@/content/site";
import { track } from "@/lib/analytics";
import { ArrowUpRight, FileText, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "fallback" | "error";

/**
 * Endpoint que recebe o lead (Formspree, Resend, n8n, API própria...).
 * Definido em `.env` como VITE_LEAD_ENDPOINT. Sem ele o formulário cai para
 * o fluxo de e-mail/WhatsApp, mas nunca descarta o lead em silêncio.
 */
const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined;

interface Lead {
  name: string;
  company: string;
  contact: string;
  area: string;
  message: string;
}

function buildMailto(lead: Lead) {
  const subject = encodeURIComponent("Diagnóstico de eficiência — Scalio");
  const body = encodeURIComponent(
    `Nome: ${lead.name}\nEmpresa: ${lead.company}\nContato: ${lead.contact}\nÁrea: ${lead.area}\n\nMensagem: ${
      lead.message || "Não informado"
    }`,
  );
  return `${mailtoUrl}?subject=${subject}&body=${body}`;
}

function buildWhatsapp(lead: Lead) {
  const text = encodeURIComponent(
    `Olá! Quero um diagnóstico de eficiência.\nNome: ${lead.name}\nEmpresa: ${lead.company}\nÁrea: ${lead.area}`,
  );
  return `${whatsappUrl}?text=${text}`;
}

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [lead, setLead] = useState<Lead | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots preenchem campos escondidos, pessoas não.
    if (data.get("website")) return;

    const payload: Lead = {
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      contact: String(data.get("contact") ?? ""),
      area: String(data.get("area") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    setLead(payload);

    if (!LEAD_ENDPOINT) {
      // Sem endpoint configurado: abre o cliente de e-mail e, se nada
      // acontecer, os links de fallback continuam visíveis na tela.
      setStatus("fallback");
      track("lead_submit", { channel: "mailto" });
      window.location.href = buildMailto(payload);
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, source: "homepage", sentAt: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("success");
      track("lead_submit", { channel: "endpoint" });
      form.reset();
    } catch (error) {
      setStatus("error");
      track("lead_submit_error", { reason: error instanceof Error ? error.message : "unknown" });
    }
  };

  const sending = status === "sending";

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate={false}>
      <p className="form-heading">
        <FileText size={18} aria-hidden="true" />
        <span>Diagnóstico inicial</span>
      </p>

      <label className="sr-only" htmlFor="lead-name">
        Seu nome
      </label>
      <input id="lead-name" name="name" required autoComplete="name" placeholder="Seu nome" />

      <label className="sr-only" htmlFor="lead-company">
        Empresa
      </label>
      <input id="lead-company" name="company" required autoComplete="organization" placeholder="Empresa" />

      <div className="form-row">
        <div>
          <label className="sr-only" htmlFor="lead-contact">
            E-mail ou WhatsApp
          </label>
          <input id="lead-contact" name="contact" required placeholder="E-mail ou WhatsApp" />
        </div>
        <div>
          <label className="sr-only" htmlFor="lead-area">
            Área prioritária
          </label>
          <select id="lead-area" name="area" required defaultValue="">
            <option value="" disabled>
              Área prioritária
            </option>
            {leadAreas.map((area) => (
              <option key={area}>{area}</option>
            ))}
          </select>
        </div>
      </div>

      <label className="sr-only" htmlFor="lead-message">
        Qual desafio você quer resolver?
      </label>
      <textarea id="lead-message" name="message" rows={3} placeholder="Qual desafio você quer resolver?" />

      {/* Honeypot anti-spam: invisível e fora da ordem de tabulação. */}
      <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <button className="button button-primary" type="submit" disabled={sending}>
        {sending ? (
          <>
            Enviando <Loader2 size={17} className="spinning" aria-hidden="true" />
          </>
        ) : (
          <>
            Enviar diagnóstico <ArrowUpRight size={17} aria-hidden="true" />
          </>
        )}
      </button>

      <div className="form-status" role="status" aria-live="polite">
        {status === "success" && (
          <p className="is-success">Recebemos seu diagnóstico. Nossa equipe responde em até 1 dia útil.</p>
        )}
        {status === "fallback" && lead && (
          <p>
            Abrimos seu aplicativo de e-mail. Não abriu?{" "}
            <a href={buildMailto(lead)}>Enviar para {site.email}</a> ou{" "}
            <a href={buildWhatsapp(lead)} target="_blank" rel="noreferrer">
              falar no WhatsApp
            </a>
            .
          </p>
        )}
        {status === "error" && lead && (
          <p className="is-error">
            Não conseguimos enviar agora. Fale com a gente por{" "}
            <a href={buildWhatsapp(lead)} target="_blank" rel="noreferrer">
              WhatsApp
            </a>{" "}
            ou <a href={buildMailto(lead)}>e-mail</a>.
          </p>
        )}
      </div>

      <small>Usamos seus dados apenas para responder a este contato.</small>
    </form>
  );
}
