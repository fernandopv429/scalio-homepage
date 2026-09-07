import Audience from "@/sections/Audience";
import Cases from "@/sections/Cases";
import Contact from "@/sections/Contact";
import Faq from "@/sections/Faq";
import Hero from "@/sections/Hero";
import Insights from "@/sections/Insights";
import Intro from "@/sections/Intro";
import Method from "@/sections/Method";
import Services from "@/sections/Services";
import SiteFooter from "@/sections/SiteFooter";
import SiteNav from "@/sections/SiteNav";
import Statement from "@/sections/Statement";
import Trust from "@/sections/Trust";

export default function Home() {
  return (
    <div id="top" className="site-shell">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <SiteNav />
      <main id="conteudo">
        <Hero />
        <Intro />
        <Services />
        <Method />
        <Statement />
        <Audience />
        <Cases />
        <Trust />
        <Faq />
        <Insights />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
