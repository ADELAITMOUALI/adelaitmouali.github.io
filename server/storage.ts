import { getSkills, getProjects } from "./data";
import type { Skill, Project } from "@shared/schema";

export interface IStorage {
  getSkills(): Promise<Skill[]>;
  getProjects(): Promise<Project[]>;
}

export class LocalStorage implements IStorage {
  async getSkills(): Promise<Skill[]> {
    return await getSkills();
  }

  async getProjects(): Promise<Project[]> {
    return await getProjects();
  }
}

export const storage = new LocalStorage();
