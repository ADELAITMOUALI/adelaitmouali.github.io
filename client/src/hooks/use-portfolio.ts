import { useQuery } from "@tanstack/react-query";
import { skills } from "@shared/data";

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      return skills;
    },
  });
}
