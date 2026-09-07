export default function Intro() {
  return (
    <section id="sobre" className="intro-section">
      <div className="container intro-grid">
        <p className="section-kicker">01 / O ponto de partida</p>
        <div className="intro-main">
          <p className="display-copy">
            Tecnologia não é o destino.
            <br />
            <span>É o caminho para uma empresa melhor.</span>
          </p>
          <p className="body-copy">
            A Scalio existe para ajudar negócios a reduzir desperdícios, aumentar a eficiência e tomar decisões com mais
            clareza. Sem transformar tecnologia em moda — e sem complicar o que pode ser simples.
          </p>
        </div>
        <div className="metric-card">
          <span>O que nos move</span>
          <strong>
            Clareza
            <br />
            antes da
            <br />
            <i>complexidade.</i>
          </strong>
          <div className="metric-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
