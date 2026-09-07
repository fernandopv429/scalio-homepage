import { insights } from "@/content/site";
import { ArrowUpRight } from "lucide-react";

export default function Insights() {
  return (
    <section className="insights-section">
      <div className="container insights-grid">
        <div>
          <p className="section-kicker">07 / Insights</p>
          <h2>
            Ideias para uma
            <br />
            <span>operação melhor.</span>
          </h2>
        </div>
        <div className="insight-links">
          {insights.map((insight) => (
            <a href={insight.href} key={insight.kicker}>
              <span>{insight.kicker}</span>
              <strong>
                {insight.title} <ArrowUpRight size={17} aria-hidden="true" />
              </strong>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
