import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { db } from "./db";
import { skills, projects } from "@shared/schema";

async function seedDatabase() {
  const existingSkills = await storage.getSkills();
  if (existingSkills.length === 0) {
    await db.insert(skills).values([
      // Red Zone (Offensive)
      { name: "Linux 101", domain: "red", category: "Core", description: "Privilege awareness and enumeration." },
      { name: "Web Hacking", domain: "red", category: "Application", description: "API testing, bug bounty workflows." },
      { name: "Exploitation", domain: "red", category: "Practical", description: "Hands-on vulnerability exploitation." },
      { name: "Pentesting Toolkits", domain: "red", category: "Tools", description: "Burp Suite, Hash Cracking, and other offensive tools." },
      // Blue Zone (Defensive)
      { name: "Firewall Configuration", domain: "blue", category: "Network", description: "FortiGate, UFW." },
      { name: "Network Segmentation", domain: "blue", category: "Network", description: "VPN setup and segmentation." },
      { name: "Traffic Monitoring", domain: "blue", category: "Monitoring", description: "Log analysis and Wireshark." },
      { name: "Systems Hardening", domain: "blue", category: "Systems", description: "Directory services, group policies." },
      { name: "SecOps", domain: "blue", category: "Operations", description: "Security operations workflow experience." },
      // Neutral Zone (Core)
      { name: "Network Architecture", domain: "neutral", category: "Infrastructure", description: "Switching, Routing, VLANs, TCP/IP, DNS, DHCP." },
      { name: "Systems", domain: "neutral", category: "Infrastructure", description: "Linux, Windows Server, VirtualBox, Docker." },
      { name: "Scripting", domain: "neutral", category: "Programming", description: "Python (automation, data analysis), Bash/Shell." },
      { name: "IoT & Embedded", domain: "neutral", category: "Hardware", description: "Arduino, ESP32, Raspberry Pi, sensors." },
      { name: "Applied ML", domain: "neutral", category: "Data", description: "YOLOv6, YOLOv8 model training." },
    ]);
  }

  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await db.insert(projects).values([
      { title: "Environmental Monitoring Alerts", description: "Automated alert system via Telegram/SMS/Gmail.", techStack: ["Python", "IoT", "Sensors"], domain: "neutral" },
      { title: "Object Detection Models", description: "Trained and deployed YOLOv6 and YOLOv8 models for computer vision.", techStack: ["Python", "Machine Learning", "YOLO"], domain: "neutral" },
      { title: "TryHackMe Completions", description: "Completed modules in Log Analysis, Hash Cracking, and Burp Suite.", techStack: ["Burp Suite", "Security Tools"], domain: "red" },
      { title: "Network Segmentation Deployment", description: "Designed and implemented secure network boundaries using FortiGate and VPNs.", techStack: ["FortiGate", "VPN", "Routing"], domain: "blue" },
    ]);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed database on startup
  await seedDatabase();

  app.get(api.skills.list.path, async (req, res) => {
    const allSkills = await storage.getSkills();
    res.json(allSkills);
  });

  app.get(api.projects.list.path, async (req, res) => {
    const allProjects = await storage.getProjects();
    res.json(allProjects);
  });

  return httpServer;
}
