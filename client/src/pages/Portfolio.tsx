import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SocialLinks } from "@/components/SocialLinks";
import { ContentArea } from "@/components/ContentArea";
import { Crosshair, Cpu, Shield } from "lucide-react";

type DomainType = "neutral" | "blue" | "red";

// Hero Section: Takes up the initial viewport height.
function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-4">
      <img src="/images/myimage.jpg" alt="Adel Ait Mouali" className="w-24 h-24 rounded-full object-cover mb-4" />
      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tighter uppercase text-foreground">
        Adel Ait Mouali
      </h1>
      <p className="font-mono text-sm md:text-base text-domain uppercase tracking-[0.2em] mt-2 mb-4">
        Network Specialist
      </p>
      <iframe
        src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=1487925"
        title="tryhackme-badge"
        style={{ border: 'none', width: '350px', height: '150px', marginBottom: '24px', flexShrink: 0 }}
        loading="lazy"
      />
      <SocialLinks />
    </section>
  );
}

// Content Section: Standard section with vertical padding.
function ContentSection({ 
  domain, 
  title, 
  icon: Icon, 
  onInView 
}: { 
  domain: DomainType; 
  title: string; 
  icon: any;
  onInView: (domain: DomainType) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 }); // Trigger when 30% is visible

  useEffect(() => {
    if (isInView) {
      onInView(domain);
    }
  }, [isInView, domain, onInView]);

  return (
    <section 
      ref={ref}
      className="flex flex-col justify-center py-24 sm:py-32 relative" // Removed h-screen and snap-start
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-domain shadow-domain rounded-full opacity-50" />
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }} // Animation triggers when 50% is visible
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-2xl bg-domain-alpha-10 border border-domain-alpha-20 text-domain">
              <Icon className="w-10 h-10" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground italic">
              {title}
            </h2>
          </div>
        </motion.div>
        <ContentArea domain={domain} />
      </div>
    </section>
  );
}

// Main Portfolio Component
export default function Portfolio() {
  const [activeDomain, setActiveDomain] = useState<DomainType>("neutral");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { threshold: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // Removed h-screen and overflow-hidden to allow natural page scroll
    <div className={`theme-${activeDomain} bg-background text-foreground transition-colors duration-1000`}>
      {/* Background and cursor effects */}
      <div className="ambient-glow" />
      <div className="fixed inset-0 z-0 bg-grid-pattern opacity-50" />
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--domain-color) / 0.05), transparent 40%)` }}
      />

      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 py-4 px-4 sm:px-6 lg:px-8 transition-opacity duration-300 ${isHeroInView ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/images/myimage.jpg" alt="Adel Ait Mouali" className="w-10 h-10 rounded-full object-cover" />
            <h1 className="font-display text-xl font-bold tracking-tighter uppercase text-foreground">
              Adel Ait Mouali
            </h1>
          </div>
          <SocialLinks />
        </div>
      </header>
      
      {/* Main container now scrolls naturally */}
      <main className="w-full">
        <div ref={heroRef}>
          <HeroSection />
        </div>
        <ContentSection domain="neutral" title="Core Technology" icon={Cpu} onInView={setActiveDomain} />
        <ContentSection domain="blue" title="Defense Operations" icon={Shield} onInView={setActiveDomain} />
        <ContentSection domain="red" title="Offense Capabilities" icon={Crosshair} onInView={setActiveDomain} />
      </main>
    </div>
  );
}
