import { skills, projects } from "./data";
import type { Skill, Project } from "@shared/schema";

export interface IStorage {
  getSkills(): Promise<Skill[]>;
  getProjects(): Promise<Project[]>;
}

export class LocalStorage implements IStorage {
  async getSkills(): Promise<Skill[]> {
    return skills;
  }

  async getProjects(): Promise<Project[]> {
    return projects;
  }
}

export const storage = new LocalStorage();
