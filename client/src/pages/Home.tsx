import { ArrowRight, ArrowUpRight, BarChart3, Check, ChevronDown, Cloud, FileText, LockKeyhole, Menu, MessageCircle, Network, Plus, Sparkles, Workflow, X } from "lucide-react";
import { useState, type FormEvent } from "react";

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

const cases = [
  ["01", "Operações financeiras", "Automação de conferências, relatórios e integrações para reduzir retrabalho.", "RPA / Dados"],
  ["02", "Conhecimento interno", "IA para encontrar informações e responder perguntas com mais velocidade.", "IA aplicada"],
  ["03", "Gestão em nuvem", "Dados e aplicações organizados para escalar com governança e segurança.", "Cloud / Segurança"],
];

const audiences = ["Empresas em crescimento", "Operações com muito trabalho manual", "Times que usam várias planilhas e sistemas", "Negócios que querem aplicar IA com segurança"];

const faqs = [
  ["A Scalio atende pequenas e médias empresas?", "Sim. O trabalho começa pelo contexto e pelo processo prioritário, não pelo tamanho da empresa ou por uma plataforma específica."],
  ["É necessário trocar todos os sistemas atuais?", "Não. Buscamos aproveitar o que já funciona e conectar, simplificar ou automatizar os pontos que geram mais fricção."],
  ["A Scalio implementa Microsoft e Google Cloud?", "Sim. Avaliamos a necessidade do negócio e desenhamos soluções usando as ferramentas mais adequadas, incluindo Microsoft, Google Cloud, IA, RPA e integrações."],
  ["Como a segurança entra no projeto?", "Desde o diagnóstico. A proteção de acessos, dados, integrações e continuidade faz parte da arquitetura e das decisões de implementação."],
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const closeMenu = () => setMenuOpen(false);
  const handleLeadSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Diagnóstico de eficiência — Scalio");
    const body = encodeURIComponent(`Nome: ${form.get("name")}\nEmpresa: ${form.get("company")}\nContato: ${form.get("contact")}\nÁrea: ${form.get("area")}\n\nMensagem: ${form.get("message") || "Não informado"}`);
    window.location.href = `mailto:comercial@nexusdevhub.com?subject=${subject}&body=${body}`;
  };

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

      <section className="audience-section"><div className="container audience-grid"><div><div className="section-kicker">04 / Para quem é</div><h2>Se existe<br />um gargalo,<br /><span>existe caminho.</span></h2></div><div className="audience-list">{audiences.map((item) => <div className="audience-item" key={item}><Check size={17} /><span>{item}</span></div>)}<p>Não é sobre adicionar mais uma ferramenta. É sobre fazer a operação funcionar melhor com as ferramentas certas.</p></div></div></section>

      <section className="cases-section"><div className="container"><div className="section-head"><div><div className="section-kicker">05 / Onde aplicamos</div><h2>Problemas reais.<br /><span>Aplicações práticas.</span></h2></div><p>Alguns pontos de partida para transformar complexidade em eficiência mensurável.</p></div><div className="cases-grid">{cases.map(([number, title, text, tag]) => <article className="case-card" key={number}><div className="case-number">{number}</div><div><span>{tag}</span><h3>{title}</h3><p>{text}</p><a href="#contato">Explorar possibilidade <ArrowRight size={15} /></a></div></article>)}</div></div></section>

      <section className="trust-section"><div className="container trust-row"><span>Estratégia</span><i /> <span>IA aplicada</span><i /> <span>Automação</span><i /> <span>Cloud</span><i /> <span>Segurança</span><i /> <span>Eficiência</span></div></section>

      <section className="faq-section"><div className="container faq-grid"><div><div className="section-kicker">06 / Perguntas frequentes</div><h2>Clareza para<br /><span>começar.</span></h2><p>Se a sua dúvida não estiver aqui, fale diretamente com a nossa equipe.</p><a className="text-link dark-link" href="https://wa.me/5511965085130" target="_blank" rel="noreferrer">Conversar no WhatsApp <ArrowUpRight size={15} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span>{openFaq === index ? <X size={17} /> : <Plus size={17} />}</button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>

      <section className="insights-section"><div className="container insights-grid"><div><div className="section-kicker">07 / Insights</div><h2>Ideias para uma<br /><span>operação melhor.</span></h2></div><div className="insight-links"><a href="#solucoes"><span>01 / IA aplicada</span><strong>Como encontrar o primeiro processo para automatizar <ArrowUpRight size={17} /></strong></a><a href="#solucoes"><span>02 / Eficiência</span><strong>O custo invisível dos processos manuais <ArrowUpRight size={17} /></strong></a><a href="#solucoes"><span>03 / Segurança</span><strong>Por que segurança precisa entrar no início <ArrowUpRight size={17} /></strong></a></div></div></section>

      <section id="contato" className="contact-section"><div className="container contact-card"><div className="contact-content"><div className="section-kicker">08 / Vamos conversar</div><h2>Qual processo<br />pode ser <span>melhor?</span></h2><p>Conte onde sua empresa quer chegar. A gente ajuda a encontrar o próximo passo.</p><div className="contact-actions"><a className="button button-primary" href="mailto:comercial@nexusdevhub.com">comercial@nexusdevhub.com <ArrowUpRight size={17} /></a><a className="contact-phone" href="https://wa.me/5511965085130" target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp: (11) 96508-5130 <ArrowUpRight size={15} /></a></div></div><form className="lead-form" onSubmit={handleLeadSubmit}><div className="form-heading"><FileText size={18} /><span>Diagnóstico inicial</span></div><input name="name" required placeholder="Seu nome" /><input name="company" required placeholder="Empresa" /><div className="form-row"><input name="contact" required placeholder="E-mail ou WhatsApp" /><select name="area" defaultValue=""><option value="" disabled>Área prioritária</option><option>Processos e operações</option><option>IA e dados</option><option>Automação e RPA</option><option>Cloud e segurança</option></select></div><textarea name="message" rows={3} placeholder="Qual desafio você quer resolver?"></textarea><button className="button button-primary" type="submit">Enviar diagnóstico <ArrowUpRight size={17} /></button><small>Ao enviar, seu aplicativo de e-mail será aberto com as informações preenchidas.</small></form></div></section>

      <footer className="footer"><div className="container footer-top"><Logo compact /><div className="footer-nav"><a href="#solucoes">Soluções</a><a href="#metodo">Como fazemos</a><a href="#contato">Contato</a><a href="https://www.instagram.com/scalio.consultoria/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a></div></div><div className="container footer-bottom"><span>© 2026 Scalio. Todos os direitos reservados.</span><span>Transformação digital com propósito.</span></div></footer>
    </main>
  );
}
