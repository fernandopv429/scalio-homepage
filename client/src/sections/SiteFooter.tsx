import Logo from "@/components/Logo";
import { mailtoUrl, navLinks, site } from "@/content/site";
import { ArrowUpRight } from "lucide-react";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-top">
        <Logo compact />
        <nav className="footer-nav" aria-label="Navegação do rodapé">
          {navLinks
            .filter((link) => link.href !== "#sobre")
            .map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          <a href={mailtoUrl}>{site.email}</a>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {year} Scalio. Todos os direitos reservados.</span>
        <span>Transformação digital com propósito.</span>
      </div>
    </footer>
  );
}
