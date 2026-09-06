import { ArrowUpRight, ChevronDown, Cloud, Cpu, LockKeyhole, Menu, Network, Sparkles, Workflow, X } from "lucide-react";
import { useState } from "react";

const services = [
  {
    number: "01",
    icon: Workflow,
    title: "Automação & RPA",
    text: "Elimine tarefas repetitivas e devolva tempo para o que realmente move o negócio.",
    tag: "Eficiência operacional",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "IA aplicada",
    text: "Transforme dados e conhecimento em decisões mais rápidas, consistentes e inteligentes.",
    tag: "Inteligência prática",
  },
  {
    number: "03",
    icon: Cloud,
    title: "Nuvem & produtividade",
    text: "Conecte pessoas, aplicações e informações com Microsoft, Google Cloud e integrações sob medida.",
    tag: "Escala segura",
  },
  {
    number: "04",
    icon: LockKeyhole,
    title: "Segurança estratégica",
    text: "Proteja acessos, dados e operações desde o início da transformação digital.",
    tag: "Confiança por design",
  },
];

const steps = [
  ["01", "Entender", "Mapeamos objetivos, gargalos e oportunidades reais."],
  ["02", "Priorizar", "Definimos o que gera mais impacto com menos complexidade."],
  ["03", "Construir", "Desenhamos e implementamos soluções que a equipe adota."],
  ["04", "Evoluir", "Medimos, aprendemos e melhoramos continuamente."],
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand ${compact ? "brand-compact" : ""}`} href="#top" aria-label="Scalio — início">
      <img src="/manus-storage/logo_corporativa_laranja_35311b5a.png" alt="" />
      <span>scalio</span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top" className="site-shell">
      <nav className="nav-wrap" aria-label="Navegação principal">
        <div className="nav-inner">
          <Logo />
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <a href="#solucoes" onClick={closeMenu}>Soluções</a>
            <a href="#metodo" onClick={closeMenu}>Como fazemos</a>
            <a href="#sobre" onClick={closeMenu}>Sobre a Scalio</a>
            <a className="nav-contact" href="#contato" onClick={closeMenu}>Fale com a gente <ArrowUpRight size={15} /></a>
          </div>
          <button className="menu-button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-grid" />
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-content container">
          <div className="eyebrow"><span className="pulse-dot" /> Transformação digital estratégica</div>
          <h1>Menos operação.<br /><em>Mais evolução.</em></h1>
          <p className="hero-copy">A Scalio conecta estratégia, tecnologia e execução para transformar processos complexos em operações mais eficientes, seguras e preparadas para crescer.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contato">Descobrir oportunidades <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#solucoes">Conheça nossas soluções <span>↓</span></a>
          </div>
          <div className="hero-proof"><span>IA</span><span>RPA</span><span>Cloud</span><span>Security</span><span>Strategy</span></div>
        </div>
        <div className="hero-signature">SCALIO / 01 <span>•</span> BUSINESS TECHNOLOGY</div>
        <div className="hero-scroll"><span>Scroll para explorar</span><ChevronDown size={15} /></div>
      </section>

      <section id="sobre" className="intro-section">
        <div className="container intro-grid">
          <div className="section-kicker">01 / O ponto de partida</div>
          <div className="intro-main"><p className="display-copy">Tecnologia não é o destino.<br /><span>É o caminho para uma empresa melhor.</span></p><p className="body-copy">A Scalio existe para ajudar negócios a reduzir desperdícios, aumentar a eficiência e tomar decisões com mais clareza. Sem transformar tecnologia em moda — e sem complicar o que pode ser simples.</p></div>
          <div className="metric-card"><span>O que nos move</span><strong>Clareza<br />antes da<br /><i>complexidade.</i></strong><div className="metric-line" /></div>
        </div>
      </section>

      <section id="solucoes" className="services-section">
        <div className="container">
          <div className="section-head"><div><div className="section-kicker">02 / O que fazemos</div><h2>Estratégia que<br /><span>vira movimento.</span></h2></div><p>Escolha um ponto de partida. A transformação acontece quando cada solução responde a uma necessidade real do negócio.</p></div>
          <div className="services-grid">{services.map((service) => { const Icon = service.icon; return <article className="service-card" key={service.number}><div className="service-top"><span className="service-number">{service.number}</span><Icon size={25} strokeWidth={1.5} /></div><div className="service-body"><span className="service-tag">{service.tag}</span><h3>{service.title}</h3><p>{service.text}</p><a href="#contato" aria-label={`Saiba mais sobre ${service.title}`}><ArrowUpRight size={18} /></a></div></article>; })}</div>
        </div>
      </section>

      <section id="metodo" className="method-section">
        <div className="container method-grid"><div className="method-intro"><div className="section-kicker">03 / Como fazemos</div><h2>Do problema<br />ao <span>progresso.</span></h2><p>Um método simples para problemas que não são. Olhamos o todo, começamos pelo essencial e construímos com quem faz acontecer.</p><a className="button button-outline" href="#contato">Conversar sobre um desafio <ArrowUpRight size={17} /></a></div><div className="steps-list">{steps.map(([number, title, text]) => <div className="step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={17} /></div>)}</div></div>
      </section>

      <section className="statement-section"><div className="statement-mark">+</div><div className="container"><p>O futuro não precisa ser<br /><span>mais complicado.</span></p><div className="statement-bottom"><span>Scalio / Tecnologia estratégica para empresas mais eficientes.</span><a href="#contato">Começar uma conversa <ArrowUpRight size={16} /></a></div></div></section>

      <section id="contato" className="contact-section"><div className="container contact-card"><div className="contact-content"><div className="section-kicker">04 / Vamos conversar</div><h2>Qual processo<br />pode ser <span>melhor?</span></h2><p>Conte onde sua empresa quer chegar. A gente ajuda a encontrar o próximo passo.</p><div className="contact-actions"><a className="button button-primary" href="mailto:comercial@nexusdevhub.com">comercial@nexusdevhub.com <ArrowUpRight size={17} /></a><a className="contact-phone" href="https://wa.me/5511965085130" target="_blank" rel="noreferrer">WhatsApp: (11) 96508-5130 <ArrowUpRight size={15} /></a></div></div><div className="contact-orbit"><div className="orbit-core"><Network size={31} /></div><span className="orbit-label label-one">IA</span><span className="orbit-label label-two">RPA</span><span className="orbit-label label-three">CLOUD</span><span className="orbit-label label-four">SECURITY</span></div></div></section>

      <footer className="footer"><div className="container footer-top"><Logo compact /><div className="footer-nav"><a href="#solucoes">Soluções</a><a href="#metodo">Como fazemos</a><a href="#contato">Contato</a><a href="https://www.instagram.com/scalio.consultoria/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a></div></div><div className="container footer-bottom"><span>© 2026 Scalio. Todos os direitos reservados.</span><span>Transformação digital com propósito.</span></div></footer>
    </main>
  );
}
