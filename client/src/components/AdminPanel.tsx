import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Database, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateSkill, useCreateProject } from "@/hooks/use-portfolio";

export function AdminPanel({ activeDomain }: { activeDomain: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"skill" | "project">("skill");
  
  const createSkill = useCreateSkill();
  const createProject = useCreateProject();

  const [skillForm, setSkillForm] = useState({
    name: "",
    domain: activeDomain,
    category: "",
    description: ""
  });

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    techStack: "",
    domain: activeDomain
  });

  const handleSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSkill.mutate({ ...skillForm, domain: activeDomain });
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProject.mutate({ 
      ...projectForm, 
      domain: activeDomain,
      techStack: projectForm.techStack.split(',').map(s => s.trim()).filter(Boolean)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="fixed bottom-6 right-6 z-50 bg-black/80 border-white/10 hover:border-domain text-muted-foreground hover:text-domain shadow-lg backdrop-blur-md transition-all duration-300"
        >
          <Database className="w-4 h-4 mr-2" />
          System Override
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-xl border-domain-alpha-20 shadow-domain">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-domain animate-pulse" />
            Registry Override <span className="text-domain text-sm ml-2 uppercase">[{activeDomain} SECTOR]</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 border-b border-border/50 pb-2 mb-4">
          <button
            onClick={() => setActiveTab("skill")}
            className={`text-sm font-display px-4 py-2 rounded-t-md transition-colors ${activeTab === "skill" ? "text-domain border-b-2 border-domain" : "text-muted-foreground hover:text-foreground"}`}
          >
            Inject Skill
          </button>
          <button
            onClick={() => setActiveTab("project")}
            className={`text-sm font-display px-4 py-2 rounded-t-md transition-colors ${activeTab === "project" ? "text-domain border-b-2 border-domain" : "text-muted-foreground hover:text-foreground"}`}
          >
            Deploy Project
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "skill" ? (
            <motion.form 
              key="skill"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              onSubmit={handleSkillSubmit} 
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>Skill Designation</Label>
                <Input required value={skillForm.name} onChange={e => setSkillForm(prev => ({...prev, name: e.target.value}))} className="bg-black/50 border-white/10 focus-visible:ring-domain/50" placeholder="e.g. Reverse Engineering" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input required value={skillForm.category} onChange={e => setSkillForm(prev => ({...prev, category: e.target.value}))} className="bg-black/50 border-white/10 focus-visible:ring-domain/50" placeholder="e.g. Exploitation" />
              </div>
              <div className="space-y-2">
                <Label>Parameters / Description</Label>
                <Textarea required value={skillForm.description} onChange={e => setSkillForm(prev => ({...prev, description: e.target.value}))} className="bg-black/50 border-white/10 focus-visible:ring-domain/50" placeholder="Operational details..." />
              </div>
              <Button type="submit" disabled={createSkill.isPending} className="w-full bg-domain/20 text-domain hover:bg-domain hover:text-black border border-domain/50 transition-all">
                {createSkill.isPending ? "Executing..." : "Execute Injection"}
              </Button>
            </motion.form>
          ) : (
            <motion.form 
              key="project"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              onSubmit={handleProjectSubmit} 
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>Project Codename</Label>
                <Input required value={projectForm.title} onChange={e => setProjectForm(prev => ({...prev, title: e.target.value}))} className="bg-black/50 border-white/10 focus-visible:ring-domain/50" placeholder="e.g. Project VANGUARD" />
              </div>
              <div className="space-y-2">
                <Label>Tech Stack Array (Comma separated)</Label>
                <Input required value={projectForm.techStack} onChange={e => setProjectForm(prev => ({...prev, techStack: e.target.value}))} className="bg-black/50 border-white/10 focus-visible:ring-domain/50" placeholder="e.g. Python, Wireshark, Bash" />
              </div>
              <div className="space-y-2">
                <Label>Mission Briefing</Label>
                <Textarea required value={projectForm.description} onChange={e => setProjectForm(prev => ({...prev, description: e.target.value}))} className="bg-black/50 border-white/10 focus-visible:ring-domain/50" placeholder="Mission parameters..." />
              </div>
              <Button type="submit" disabled={createProject.isPending} className="w-full bg-domain/20 text-domain hover:bg-domain hover:text-black border border-domain/50 transition-all">
                {createProject.isPending ? "Executing..." : "Deploy Asset"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
