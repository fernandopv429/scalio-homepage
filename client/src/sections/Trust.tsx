import { Fragment } from "react";

const pillars = ["Estratégia", "IA aplicada", "Automação", "Cloud", "Segurança", "Eficiência"];

export default function Trust() {
  return (
    <section className="trust-section" aria-label="Áreas de atuação">
      <div className="container trust-row">
        {pillars.map((pillar, index) => (
          <Fragment key={pillar}>
            <span>{pillar}</span>
            {index < pillars.length - 1 && <i aria-hidden="true" />}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
