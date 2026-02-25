import { motion, AnimatePresence } from "framer-motion";
import { Terminal, FolderGit2 } from "lucide-react";
import { useSkills, useProjects } from "@/hooks/use-portfolio";
import type { DomainType } from "./ZoneSelector";

export function ContentArea({ domain }: { domain: DomainType }) {
  const { data: skills, isLoading: loadingSkills } = useSkills();
  const { data: projects, isLoading: loadingProjects } = useProjects();

  const activeSkills = skills?.filter(s => s.domain === domain) || [];
  const activeProjects = projects?.filter(p => p.domain === domain) || [];

  const isEmpty = !loadingSkills && activeSkills.length === 0 && !loadingProjects && activeProjects.length === 0;

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
          {loadingSkills || loadingProjects ? (
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
              {activeSkills.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                    <Terminal className="text-domain w-5 h-5" />
                    <h2 className="font-display text-2xl font-semibold tracking-wide text-foreground">OPERATIONAL PROTOCOLS</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeSkills.map((skill, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        key={skill.id} 
                        className="group relative p-5 rounded-xl border border-white/10 bg-black/40 hover:border-domain-alpha-50 transition-colors overflow-hidden backdrop-blur-sm"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-domain transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                        <div className="absolute right-4 top-4 text-xs font-body text-domain/50 group-hover:text-domain transition-colors">
                          [{skill.category}]
                        </div>
                        <h4 className="font-display text-lg text-foreground mb-2 pr-12">{skill.name}</h4>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects Section */}
              {activeProjects.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                    <FolderGit2 className="text-domain w-5 h-5" />
                    <h2 className="font-display text-2xl font-semibold tracking-wide text-foreground">DEPLOYED ASSETS</h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {activeProjects.map((project, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={project.id} 
                        className="group relative flex flex-col rounded-2xl p-6 md:p-8 border border-white/10 bg-black/60 hover:bg-black/80 hover:border-domain-alpha-50 transition-all duration-500 backdrop-blur-md"
                      >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-domain-alpha-10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        
                        <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-domain transition-colors relative z-10">
                          {project.title}
                        </h3>
                        
                        <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed flex-grow relative z-10">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 relative z-10 pt-4 border-t border-white/5">
                          {project.techStack.map((tech, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1.5 text-xs font-body tracking-wider rounded-md border border-domain-alpha-20 text-domain bg-domain-alpha-5 group-hover:bg-domain-alpha-10 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
