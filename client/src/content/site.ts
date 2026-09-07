import { Cloud, LockKeyhole, Sparkles, Workflow, type LucideIcon } from "lucide-react";

/**
 * Conteúdo editorial da homepage.
 * Centralizado aqui para que texto possa ser revisado sem tocar em layout.
 */

export const site = {
  name: "Scalio",
  tagline: "Transformação digital estratégica",
  description:
    "A Scalio conecta estratégia, tecnologia e execução para transformar processos complexos em operações mais eficientes, seguras e preparadas para crescer.",
  email: "comercial@nexusdevhub.com",
  whatsapp: {
    // Número em formato internacional, sem símbolos (usado no link wa.me).
    number: "5511965085130",
    label: "(11) 96508-5130",
  },
  instagram: "https://www.instagram.com/scalio.consultoria/",
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp.number}`;
export const mailtoUrl = `mailto:${site.email}`;

export const navLinks = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#metodo", label: "Como fazemos" },
  { href: "#sobre", label: "Sobre a Scalio" },
] as const;

export interface Service {
  number: string;
  icon: LucideIcon;
  title: string;
  text: string;
  tag: string;
}

export const services: Service[] = [
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

export interface Step {
  number: string;
  title: string;
  text: string;
}

export const steps: Step[] = [
  { number: "01", title: "Entender", text: "Mapeamos objetivos, gargalos e oportunidades reais." },
  { number: "02", title: "Priorizar", text: "Definimos o que gera mais impacto com menos complexidade." },
  { number: "03", title: "Construir", text: "Desenhamos e implementamos soluções que a equipe adota." },
  { number: "04", title: "Evoluir", text: "Medimos, aprendemos e melhoramos continuamente." },
];

export interface CaseItem {
  number: string;
  title: string;
  text: string;
  tag: string;
}

export const cases: CaseItem[] = [
  {
    number: "01",
    title: "Operações financeiras",
    text: "Automação de conferências, relatórios e integrações para reduzir retrabalho.",
    tag: "RPA / Dados",
  },
  {
    number: "02",
    title: "Conhecimento interno",
    text: "IA para encontrar informações e responder perguntas com mais velocidade.",
    tag: "IA aplicada",
  },
  {
    number: "03",
    title: "Gestão em nuvem",
    text: "Dados e aplicações organizados para escalar com governança e segurança.",
    tag: "Cloud / Segurança",
  },
];

export const audiences: string[] = [
  "Empresas em crescimento",
  "Operações com muito trabalho manual",
  "Times que usam várias planilhas e sistemas",
  "Negócios que querem aplicar IA com segurança",
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "A Scalio atende pequenas e médias empresas?",
    answer:
      "Sim. O trabalho começa pelo contexto e pelo processo prioritário, não pelo tamanho da empresa ou por uma plataforma específica.",
  },
  {
    question: "É necessário trocar todos os sistemas atuais?",
    answer:
      "Não. Buscamos aproveitar o que já funciona e conectar, simplificar ou automatizar os pontos que geram mais fricção.",
  },
  {
    question: "A Scalio implementa Microsoft e Google Cloud?",
    answer:
      "Sim. Avaliamos a necessidade do negócio e desenhamos soluções usando as ferramentas mais adequadas, incluindo Microsoft, Google Cloud, IA, RPA e integrações.",
  },
  {
    question: "Como a segurança entra no projeto?",
    answer:
      "Desde o diagnóstico. A proteção de acessos, dados, integrações e continuidade faz parte da arquitetura e das decisões de implementação.",
  },
];

export interface Insight {
  kicker: string;
  title: string;
  href: string;
}

export const insights: Insight[] = [
  { kicker: "01 / IA aplicada", title: "Como encontrar o primeiro processo para automatizar", href: "#solucoes" },
  { kicker: "02 / Eficiência", title: "O custo invisível dos processos manuais", href: "#solucoes" },
  { kicker: "03 / Segurança", title: "Por que segurança precisa entrar no início", href: "#solucoes" },
];

export const leadAreas: string[] = [
  "Processos e operações",
  "IA e dados",
  "Automação e RPA",
  "Cloud e segurança",
];
