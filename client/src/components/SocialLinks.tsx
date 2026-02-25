import { Github, Linkedin, Mail } from "lucide-react";
import { SiTryhackme } from "react-icons/si";

export function SocialLinks() {
  const links = [
    { 
      id: "tryhackme",
      icon: SiTryhackme, 
      href: "https://tryhackme.com/p/Adel.Mouali", 
      label: "TryHackMe" 
    },
    { 
      id: "github",
      icon: Github, 
      href: "https://github.com/adelaitmouali", 
      label: "GitHub" 
    },
    { 
      id: "linkedin",
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/adel-ait-mouali-a07020237", 
      label: "LinkedIn" 
    }
  ];

  return (
    <div className="flex items-center gap-4 mt-6 md:mt-0">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3 rounded-xl border border-white/10 bg-black/40 hover:border-domain-alpha-50 hover:shadow-domain transition-all duration-300"
          aria-label={link.label}
        >
          <div className="absolute inset-0 rounded-xl bg-domain-alpha-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <link.icon className="w-6 h-6 text-muted-foreground group-hover:text-domain transition-colors relative z-10" />
        </a>
      ))}
    </div>
  );
}
