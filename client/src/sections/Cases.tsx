import { cases } from "@/content/site";
import { track } from "@/lib/analytics";
import { ArrowRight } from "lucide-react";

export default function Cases() {
  return (
    <section className="cases-section">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="section-kicker">05 / Onde aplicamos</p>
            <h2>
              Problemas reais.
              <br />
              <span>Aplicações práticas.</span>
            </h2>
          </div>
          <p>Alguns pontos de partida para transformar complexidade em eficiência mensurável.</p>
        </div>
        <div className="cases-grid">
          {cases.map((item) => (
            <article className="case-card" key={item.number}>
              <div className="case-number">{item.number}</div>
              <div>
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a
                  href="#contato"
                  aria-label={`Explorar possibilidade em ${item.title}`}
                  onClick={() => track("cta_case", { case: item.title })}
                >
                  Explorar possibilidade <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
