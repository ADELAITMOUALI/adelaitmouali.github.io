import type { Skill } from "@shared/schema";

export const skills: Skill[] = [
  {
    id: 1,
    name: "Network Analysis",
    description: "Deep understanding of network protocols and traffic analysis.",
    domain: "neutral",
    category: "CORE"
  },
  {
    id: 2,
    name: "Firewall Configuration",
    description: "Expert in configuring and maintaining network firewalls.",
    domain: "blue",
    category: "DEFENSE"
  },
  {
    id: 3,
    name: "Penetration Testing",
    description: "Simulating cyber attacks to identify and fix security vulnerabilities.",
    domain: "red",
    category: "OFFENSE"
  }
];

export async function getSkills() {
  return skills;
}
