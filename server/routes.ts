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
      { name: "Linux 101", domain: "red", category: "Core", description: "Privilege awareness and enumeration. Hands-on practice from TCM Security & TryHackMe." },
      { name: "Hacking APIs", domain: "red", category: "Application", description: "API testing, enumeration, and bug bounty workflows. Practical experience with REST/GraphQL endpoints." },
      { name: "Practical Ethical Hacking", domain: "red", category: "Exploitation", description: "The complete hacking methodology. Hands-on exploitation of network vulnerabilities and AD environments." },
      { name: "Practical Bug Bounty", domain: "red", category: "Application", description: "Advanced web application hacking, bug bounty workflows, and discovery techniques." },
      { name: "Burp Suite Pro", domain: "red", category: "Tools", description: "Request manipulation, authentication/authorization testing, and automated vulnerability scanning." },
      { name: "Practical Web Hacking", domain: "red", category: "Application", description: "Modern web exploitation techniques and security testing." },
      { name: "Metasploit & Nmap", domain: "red", category: "Tools", description: "Advanced scanning, exploitation, and post-exploitation workflows." },

      // Blue Zone (Defensive)
      { name: "Firewall Configuration", domain: "blue", category: "Network", description: "Hardening perimeters with FortiGate and UFW. Policy management and traffic filtering." },
      { name: "Network Segmentation", domain: "blue", category: "Network", description: "VPN setup, network isolation, and secure boundary management." },
      { name: "Log Analysis & Wireshark", domain: "blue", category: "Monitoring", description: "Deep packet inspection and behavioral analysis. Traffic monitoring for anomalies." },
      { name: "Systems Hardening", domain: "blue", category: "Systems", description: "Directory services, group policies, and OS level security configuration." },
      { name: "Security Operations", domain: "blue", category: "Operations", description: "Managing security alerts and incident response workflows." },

      // Neutral Zone (Core)
      { name: "Network Architecture", domain: "neutral", category: "Infrastructure", description: "Switching, Routing, VLANs, TCP/IP stack, DNS, DHCP implementation." },
      { name: "Systems Administration", domain: "neutral", category: "Infrastructure", description: "Linux (Debian/RHEL), Windows Server, Virtualization (VirtualBox, Docker)." },
      { name: "Advanced Scripting", domain: "neutral", category: "Programming", description: "Python development for automation. Libraries: Flask (web), NumPy (data), Matplotlib (viz), Tkinter (GUI), Requests." },
      { name: "IoT & Embedded Systems", domain: "neutral", category: "Hardware", description: "Hardware interaction with Arduino, ESP32, Raspberry Pi, and various sensors/actuators." },
      { name: "Applied Machine Learning", domain: "neutral", category: "Data", description: "Computer vision models with YOLOv6/v8. Model training, optimization, and deployment." },
    ]);
  }

  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await db.insert(projects).values([
      { title: "Environmental Monitoring Alerts", description: "Automated alert system via Telegram/SMS/Gmail integrated with IoT sensors.", techStack: ["Python", "IoT", "Sensors", "Flask"], domain: "neutral" },
      { title: "Object Detection Models", description: "Trained and deployed YOLOv6 and YOLOv8 models for real-time computer vision applications.", techStack: ["Python", "Machine Learning", "YOLO", "NumPy"], domain: "neutral" },
      { title: "TryHackMe Practical Mastery", description: "Practical application of TCM Security methodologies. Mastery of Burp Suite, Nmap, and exploitation toolkits.", techStack: ["Burp Suite", "Nmap", "Metasploit"], domain: "red" },
      { title: "FortiGate Network Shield", description: "Designed and implemented secure network boundaries with robust segmentation and VPNs.", techStack: ["FortiGate", "VPN", "Routing", "UFW"], domain: "blue" },
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
