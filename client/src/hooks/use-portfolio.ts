import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertSkill, InsertProject } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { projects, skills } from "../data/portfolio-data";

export function useSkills() {
  return useQuery({
    queryKey: [api.skills.list.path],
    queryFn: async () => {
      return skills;
    }
  });
}

export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      return projects;
    }
  });
}

// These endpoints do not exist in the initial routes.ts, which is expected!
// We generate them to expose complete UI functionality per requirements.
export function useCreateSkill() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertSkill) => {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: "include"
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to create skill");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Skill Added", description: "System registry updated successfully.", className: "border-domain text-domain" });
      queryClient.invalidateQueries({ queryKey: [api.skills.list.path] });
    },
    onError: (err) => {
      toast({ variant: "destructive", title: "API Unreachable", description: `Expected error simulating missing POST endpoint: ${err.message}` });
    }
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertProject) => {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: "include"
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to create project");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Project Added", description: "Database synced successfully.", className: "border-domain text-domain" });
      queryClient.invalidateQueries({ queryKey: [api.projects.list.path] });
    },
    onError: (err) => {
      toast({ variant: "destructive", title: "API Unreachable", description: `Expected error simulating missing POST endpoint: ${err.message}` });
    }
  });
}
