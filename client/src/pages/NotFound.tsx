import { ArrowUpRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="site-shell notfound">
      <div className="container notfound-inner">
        <p className="section-kicker">Erro 404</p>
        <h1>
          Página não
          <br />
          <em>encontrada.</em>
        </h1>
        <p className="notfound-copy">
          O endereço que você tentou abrir não existe ou foi movido. Volte para a home e siga a partir das nossas
          soluções.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="/">
            Voltar para a home <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a className="text-link" href="/#contato">
            Falar com a Scalio <Compass size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
