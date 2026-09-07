import { services } from "@/content/site";
import { track } from "@/lib/analytics";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  return (
    <section id="solucoes" className="services-section">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="section-kicker">02 / O que fazemos</p>
            <h2>
              Estratégia que
              <br />
              <span>vira movimento.</span>
            </h2>
          </div>
          <p>
            Escolha um ponto de partida. A transformação acontece quando cada solução responde a uma necessidade real do
            negócio.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="service-card" key={service.number}>
                <div className="service-top">
                  <span className="service-number">{service.number}</span>
                  <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="service-body">
                  <span className="service-tag">{service.tag}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <a
                    href="#contato"
                    aria-label={`Falar com a Scalio sobre ${service.title}`}
                    onClick={() => track("cta_service", { service: service.title })}
                  >
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
