import Logo from "@/components/Logo";
import { navLinks } from "@/content/site";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="nav-wrap" aria-label="Navegação principal">
      <div className="nav-inner">
        <Logo />
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`} id="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a className="nav-contact" href="#contato" onClick={closeMenu}>
            Fale com a gente <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </div>
    </nav>
  );
}
