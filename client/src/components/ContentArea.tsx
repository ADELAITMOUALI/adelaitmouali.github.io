import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Info, ChevronRight, Activity } from "lucide-react";
import { useSkills } from "@/hooks/use-portfolio";
import type { DomainType } from "./ZoneSelector";
import { useState } from "react";

export function ContentArea({ domain }: { domain: DomainType }) {
  const { data: skills, isLoading: loadingSkills } = useSkills();
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const activeSkills = skills?.filter(s => s.domain === domain) || [];

  const isEmpty = !loadingSkills && activeSkills.length === 0;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={domain}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          {loadingSkills ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-domain/30 border-t-domain animate-spin mb-6" />
              <h3 className="font-display text-xl text-domain mb-2 tracking-widest uppercase italic">Initializing Link...</h3>
            </div>
          ) : isEmpty ? (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl bg-black/20">
              <p className="font-body text-muted-foreground">Sector data currently offline.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeSkills.map((skill, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={skill.id} 
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-domain/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                    <Activity className="w-4 h-4 text-domain animate-pulse" />
                  </div>

                  <div className="mb-6">
                    <span className="text-[10px] font-mono text-domain/60 uppercase tracking-[0.3em] block mb-2">
                      SYSTEM_PROTOCOL::{skill.category}
                    </span>
                    <h4 className="font-display text-2xl font-black text-foreground group-hover:text-domain transition-colors leading-none">
                      {skill.name}
                    </h4>
                  </div>

                  <div className="relative h-20 overflow-hidden">
                    <AnimatePresence>
                      {hoveredSkill === skill.id ? (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="font-body text-sm text-muted-foreground leading-relaxed italic"
                        >
                          {skill.description}
                        </motion.p>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col gap-1 pt-2"
                        >
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-domain"
                              initial={{ width: 0 }}
                              whileInView={{ width: "60%" }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                          <div className="h-1 w-2/3 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-domain/50"
                              initial={{ width: 0 }}
                              whileInView={{ width: "40%" }}
                              transition={{ duration: 1, delay: 0.7 }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-white/20 mt-2">ACCESS_LEVEL: HANDS_ON</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 bg-domain transition-all duration-500 w-0 group-hover:w-full" />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
