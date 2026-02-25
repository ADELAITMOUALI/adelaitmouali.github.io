import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Info, ChevronRight } from "lucide-react";
import { useSkills } from "@/hooks/use-portfolio";
import type { DomainType } from "./ZoneSelector";
import { useState } from "react";

export function ContentArea({ domain }: { domain: DomainType }) {
  const { data: skills, isLoading: loadingSkills } = useSkills();
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const activeSkills = skills?.filter(s => s.domain === domain) || [];

  const isEmpty = !loadingSkills && activeSkills.length === 0;

  return (
    <div className="relative z-10 min-h-[50vh] pb-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={domain}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-12"
        >
          {loadingSkills ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-domain/30 border-t-domain animate-spin mb-6" />
              <h3 className="font-display text-xl text-domain mb-2 tracking-widest">DECRYPTING LOGS...</h3>
              <p className="font-body text-muted-foreground text-sm">Accessing {domain} sector database</p>
            </div>
          ) : isEmpty ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-2xl bg-black/20">
              <div className="w-16 h-16 rounded-full border border-domain border-dashed animate-spin-slow mb-4 flex items-center justify-center bg-domain-alpha-5">
                <div className="w-2 h-2 rounded-full bg-domain shadow-domain" />
              </div>
              <h3 className="font-display text-xl text-domain mb-2 uppercase">Sector Scan Complete</h3>
              <p className="font-body text-muted-foreground max-w-md text-sm">No active data logs found in the {domain} domain. System waiting for operator input.</p>
            </div>
          ) : (
            <>
              {/* Skills Section */}
              <section>
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                  <Terminal className="text-domain w-6 h-6 animate-pulse" />
                  <h2 className="font-display text-3xl font-bold tracking-wider text-foreground uppercase italic">OPERATIONAL PROTOCOLS</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeSkills.map((skill, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, type: "spring", stiffness: 100 }}
                      key={skill.id} 
                      onMouseEnter={() => setHoveredSkill(skill.id)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="group relative flex flex-col p-6 rounded-2xl border border-white/10 bg-black/40 hover:bg-black/60 hover:border-domain-alpha-50 transition-all duration-500 overflow-hidden backdrop-blur-md cursor-help min-h-[140px]"
                    >
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-domain to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                      
                      <div className="flex justify-between items-start mb-4">
                        <div className="px-2 py-1 rounded bg-domain-alpha-10 border border-domain-alpha-20 text-[10px] font-mono text-domain uppercase tracking-widest">
                          {skill.category}
                        </div>
                        <Info className="w-4 h-4 text-domain/30 group-hover:text-domain transition-colors" />
                      </div>

                      <h4 className="font-display text-xl font-bold text-foreground group-hover:text-domain transition-colors flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-domain opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-300" />
                        {skill.name}
                      </h4>

                      <AnimatePresence>
                        {hoveredSkill === skill.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 overflow-hidden"
                          >
                            <p className="font-body text-sm text-muted-foreground leading-relaxed pt-2 border-t border-white/5">
                              {skill.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Decorative elements */}
                      <div className="absolute bottom-2 right-2 flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                        <div className="w-1 h-1 rounded-full bg-domain" />
                        <div className="w-1 h-1 rounded-full bg-domain" />
                        <div className="w-1 h-1 rounded-full bg-domain" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
