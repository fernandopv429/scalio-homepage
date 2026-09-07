import { steps } from "@/content/site";
import { ArrowUpRight } from "lucide-react";

export default function Method() {
  return (
    <section id="metodo" className="method-section">
      <div className="container method-grid">
        <div className="method-intro">
          <p className="section-kicker">03 / Como fazemos</p>
          <h2>
            Do problema
            <br />
            ao <span>progresso.</span>
          </h2>
          <p>
            Um método simples para problemas que não são. Olhamos o todo, começamos pelo essencial e construímos com quem
            faz acontecer.
          </p>
          <a className="button button-outline" href="#contato">
            Conversar sobre um desafio <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <ol className="steps-list">
          {steps.map((step) => (
            <li className="step" key={step.number}>
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              <ArrowUpRight size={17} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
