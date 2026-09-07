import { audiences } from "@/content/site";
import { Check } from "lucide-react";

export default function Audience() {
  return (
    <section className="audience-section">
      <div className="container audience-grid">
        <div>
          <p className="section-kicker">04 / Para quem é</p>
          <h2>
            Se existe
            <br />
            um gargalo,
            <br />
            <span>existe caminho.</span>
          </h2>
        </div>
        <div className="audience-list">
          <ul>
            {audiences.map((item) => (
              <li className="audience-item" key={item}>
                <Check size={17} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Não é sobre adicionar mais uma ferramenta. É sobre fazer a operação funcionar melhor com as ferramentas
            certas.
          </p>
        </div>
      </div>
    </section>
  );
}
