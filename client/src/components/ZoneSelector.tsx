import { Crosshair, Cpu, Shield } from "lucide-react";
import { clsx } from "clsx";

export type DomainType = "red" | "neutral" | "blue";

interface ZoneSelectorProps {
  activeDomain: DomainType;
  setActiveDomain: (domain: DomainType) => void;
}

const zones: { id: DomainType; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "red", label: "Offense", desc: "Penetration Testing & Red Teaming", icon: Crosshair },
  { id: "neutral", label: "Core", desc: "Networking & Foundation", icon: Cpu },
  { id: "blue", label: "Defense", desc: "Security Operations & Blue Teaming", icon: Shield },
];

export function ZoneSelector({ activeDomain, setActiveDomain }: ZoneSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 my-12 relative z-20">
      {zones.map((zone) => {
        const isActive = activeDomain === zone.id;
        return (
          <button
            key={zone.id}
            onClick={() => setActiveDomain(zone.id)}
            onMouseEnter={() => setActiveDomain(zone.id)}
            className={clsx(
              "group relative flex flex-col items-start text-left p-6 md:p-8 rounded-2xl border transition-all duration-500 overflow-hidden",
              isActive 
                ? "border-domain bg-domain-alpha-5 shadow-domain scale-[1.02]" 
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
            )}
          >
            {/* Background interactive gradient */}
            <div className={clsx(
              "absolute inset-0 bg-gradient-to-br from-domain-alpha-20 to-transparent transition-opacity duration-500 pointer-events-none",
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
            )} />
            
            <div className="relative z-10 flex justify-between w-full items-start mb-6">
              <div className={clsx(
                "p-3 rounded-xl border backdrop-blur-md transition-colors duration-500",
                isActive ? "border-domain bg-domain-alpha-10 shadow-domain-inner text-domain" : "border-white/10 bg-black/40 text-muted-foreground"
              )}>
                <zone.icon className="w-8 h-8" />
              </div>
              <div className={clsx(
                "w-2 h-2 rounded-full transition-all duration-500",
                isActive ? "bg-domain shadow-domain scale-100 animate-pulse" : "bg-white/20 scale-50"
              )} />
            </div>

            <h3 className={clsx(
              "font-display font-bold text-2xl relative z-10 transition-colors duration-500",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}>
              {zone.label}
            </h3>
            <p className={clsx(
              "font-body text-sm mt-2 relative z-10 transition-colors duration-500",
              isActive ? "text-domain" : "text-muted-foreground/60"
            )}>
              {zone.desc}
            </p>
          </button>
        );
      })}
    </div>
  );
}
