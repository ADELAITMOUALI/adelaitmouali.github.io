import { useQuery } from "@tanstack/react-query";

export function useSkills() {
  return useQuery({
    queryKey: ["/api/skills"],
    queryFn: async () => {
      const res = await fetch("/api/skills");
      return res.json();
    }
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["/api/projects"],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      return res.json();
    }
  });
}
