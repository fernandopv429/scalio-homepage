import { mailtoUrl, site } from "@/content/site";
import { track } from "@/lib/analytics";
import { ArrowUpRight } from "lucide-react";
import LeadForm from "./LeadForm";

export default function Contact() {
  return (
    <section id="contato" className="contact-section">
      <div className="container contact-card">
        <div className="contact-content">
          <p className="section-kicker">08 / Vamos conversar</p>
          <h2>
            Qual processo
            <br />
            pode ser <span>melhor?</span>
          </h2>
          <p>Conte onde sua empresa quer chegar. A gente ajuda a encontrar o próximo passo.</p>
          <div className="contact-actions">
            <a className="button button-primary" href={mailtoUrl} onClick={() => track("cta_email")}>
              {site.email} <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
