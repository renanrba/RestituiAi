import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface FooterProps {
  onOpenModal: () => void;
}

const defaultSections = [
  {
    title: "Plataforma",
    links: [
      { name: "O que verificamos", href: "#o-que-verificamos" },
      { name: "Como funciona", href: "#como-funciona" },
      { name: "Quem somos", href: "#quem-somos" },
    ],
  },
  {
    title: "Conteúdo",
    links: [
      { name: "Blog", href: "#blog" },
      { name: "Dúvidas Frequentes", href: "#faq" },
    ],
  },
  {
    title: "Contato",
    links: [
      { name: "Atendimento via WhatsApp", href: "https://wa.me/5511999999999" },
      { name: "Segunda a Sexta, 09h às 18h", href: "#" },
      { name: "Sigilo absoluto garantido", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram size={20} />, href: "#", label: "Instagram" },
  { icon: <FaFacebook size={20} />, href: "#", label: "Facebook" },
  { icon: <FaTwitter size={20} />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin size={20} />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Termos e Condições", href: "/termos" },
  { name: "Política de Privacidade", href: "/privacidade" },
  { name: "Admin", href: "/admin" },
];

export function Footer({ onOpenModal }: FooterProps) {
  return (
    <footer className="bg-slate-100 dark:bg-[#03050A] pt-12 pb-12 border-t border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(37,99,235,0.05),transparent_50%)]" />
      
      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        {/* Footer 7 Structure */}
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href="/">
                <img
                  src="https://i.imgur.com/FsiYz4M.jpeg"
                  alt="RestituiAI"
                  title="RestituiAI"
                  className="h-10 rounded-md"
                  onError={(e) => (e.currentTarget.src = 'https://i.imgur.com/FsiYz4M.jpeg')}
                />
              </a>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">RestituiAI</h2>
            </div>
            <p className="max-w-[70%] text-sm text-slate-600 dark:text-slate-400 text-justify">
              A isenção de Imposto de Renda para portadores de moléstia grave é um direito garantido pelo Art. 6º, inciso XIV, da Lei 7.713/88.
            </p>
            <ul className="flex items-center space-x-6 text-slate-600 dark:text-slate-400">
              {defaultSocialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-brand-800 dark:hover:text-brand-400 transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {defaultSections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-slate-900 dark:text-white">{section.title}</h3>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-brand-800 dark:hover:text-brand-400 transition-colors"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-200 dark:border-white/10 py-8 text-xs font-medium text-slate-500 dark:text-slate-400 md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">© {new Date().getFullYear()} restituiai.com. Todos os direitos reservados. Em conformidade com a LGPD.</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row md:gap-6">
            {defaultLegalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
