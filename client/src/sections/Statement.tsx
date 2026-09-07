import { ArrowUpRight } from "lucide-react";

export default function Statement() {
  return (
    <section className="statement-section">
      <div className="statement-mark" aria-hidden="true">
        +
      </div>
      <div className="container">
        <p>
          O futuro não precisa ser
          <br />
          <span>mais complicado.</span>
        </p>
        <div className="statement-bottom">
          <span>Scalio / Tecnologia estratégica para empresas mais eficientes.</span>
          <a href="#contato">
            Começar uma conversa <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
