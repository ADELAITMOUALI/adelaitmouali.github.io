import { useState, useEffect } from "react";
import { SocialLinks } from "@/components/SocialLinks";
import { ZoneSelector, type DomainType } from "@/components/ZoneSelector";
import { ContentArea } from "@/components/ContentArea";
import { AdminPanel } from "@/components/AdminPanel";

export default function Portfolio() {
  const [activeDomain, setActiveDomain] = useState<DomainType>("neutral");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`min-h-screen theme-${activeDomain} bg-background overflow-x-hidden relative transition-colors duration-1000`}>
      {/* Background Ambience Layers */}
      <div className="ambient-glow" />
      <div className="fixed inset-0 z-0 bg-grid-pattern opacity-50" />
      
      {/* Dynamic Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--domain-color) / 0.04), transparent 40%)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8 relative">
          <div className="relative">
            <div className="absolute -left-4 top-2 bottom-2 w-1 bg-domain shadow-domain rounded-full" />
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase text-foreground mb-2">
              Adel Ait Mouali
            </h1>
            <p className="font-body text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
              Explore the living spectrum: <span className="text-red-500">offense</span>, <span className="text-blue-500">defense</span>, and <span className="text-cyan-500">core technology</span>.
              <br className="hidden md:block" /> Skills and operational logs revealed as you interact with the grid.
            </p>
          </div>
          
          <SocialLinks />
        </header>

        {/* Interactive Matrix Hub */}
        <ZoneSelector activeDomain={activeDomain} setActiveDomain={setActiveDomain} />

        {/* Dynamic Context Render */}
        <ContentArea domain={activeDomain} />
      </div>

      {/* Hidden Admin Tool for adding data per aggressive generation requirements */}
      <AdminPanel activeDomain={activeDomain} />
    </div>
  );
}
