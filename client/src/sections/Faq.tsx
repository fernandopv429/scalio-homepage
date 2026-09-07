import { faqs, whatsappUrl } from "@/content/site";
import { track } from "@/lib/analytics";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { useState } from "react";

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="faq-section">
      <div className="container faq-grid">
        <div>
          <p className="section-kicker">06 / Perguntas frequentes</p>
          <h2>
            Clareza para
            <br />
            <span>começar.</span>
          </h2>
          <p>Se a sua dúvida não estiver aqui, fale diretamente com a nossa equipe.</p>
          <a
            className="text-link dark-link"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("cta_whatsapp", { origin: "faq" })}
          >
            Conversar no WhatsApp <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={faq.question}>
                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <X size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
                  </button>
                </h3>
                <div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-trigger-${index}`} hidden={!isOpen}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
