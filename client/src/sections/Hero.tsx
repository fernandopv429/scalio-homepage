import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="hero-content container">
        <p className="eyebrow">
          <span className="pulse-dot" aria-hidden="true" /> {site.tagline}
        </p>
        <h1>
          Menos operação.
          <br />
          <em>Mais evolução.</em>
        </h1>
        <p className="hero-copy">{site.description}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#contato" onClick={() => track("cta_hero")}>
            Descobrir oportunidades <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a className="text-link" href="#solucoes">
            Conheça nossas soluções <span aria-hidden="true">↓</span>
          </a>
        </div>
        <ul className="hero-proof">
          <li>IA</li>
          <li>RPA</li>
          <li>Cloud</li>
          <li>Security</li>
          <li>Strategy</li>
        </ul>
      </div>
      <div className="hero-signature" aria-hidden="true">
        SCALIO / 01 <span>•</span> BUSINESS TECHNOLOGY
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll para explorar</span>
        <ChevronDown size={15} />
      </div>
    </section>
  );
}
