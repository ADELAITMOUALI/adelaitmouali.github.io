
export const skills = [
  // Red Zone (Offensive)
  { id: 1, name: "Linux 101", domain: "red", category: "Core", description: "Privilege awareness and enumeration. Hands-on practice from TCM Security & TryHackMe." },
  { id: 2, name: "Hacking APIs", domain: "red", category: "Application", description: "API testing, enumeration, and bug bounty workflows. Practical experience with REST/GraphQL endpoints." },
  { id: 3, name: "Practical Ethical Hacking", domain: "red", category: "Exploitation", description: "The complete hacking methodology. Hands-on exploitation of network vulnerabilities and AD environments." },
  { id: 4, name: "Practical Bug Bounty", domain: "red", category: "Application", description: "Advanced web application hacking, bug bounty workflows, and discovery techniques." },
  { id: 5, name: "Burp Suite Pro", domain: "red", category: "Tools", description: "Request manipulation, authentication/authorization testing, and automated vulnerability scanning." },
  { id: 6, name: "Practical Web Hacking", domain: "red", category: "Application", description: "Modern web exploitation techniques and security testing." },
  { id: 7, name: "Metasploit & Nmap", domain: "red", category: "Tools", description: "Advanced scanning, exploitation, and post-exploitation workflows." },

  // Blue Zone (Defensive)
  { id: 8, name: "Firewall Configuration", domain: "blue", category: "Network", description: "Hardening perimeters with FortiGate and UFW. Policy management and traffic filtering." },
  { id: 9, name: "Network Segmentation", domain: "blue", category: "Network", description: "VPN setup, network isolation, and secure boundary management." },
  { id: 10, name: "Log Analysis & Wireshark", domain: "blue", category: "Monitoring", description: "Deep packet inspection and behavioral analysis. Traffic monitoring for anomalies." },
  { id: 11, name: "Systems Hardening", domain: "blue", category: "Systems", description: "Directory services, group policies, and OS level security configuration." },
  { id: 12, name: "Security Operations", domain: "blue", category: "Operations", description: "Managing security alerts and incident response workflows." },

  // Neutral Zone (Core)
  { id: 13, name: "Network Architecture", domain: "neutral", category: "Infrastructure", description: "Switching, Routing, VLANs, TCP/IP stack, DNS, DHCP implementation." },
  { id: 14, name: "Systems Administration", domain: "neutral", category: "Infrastructure", description: "Linux (Debian/RHEL), Windows Server, Virtualization (VirtualBox, Docker)." },
  { id: 15, name: "Advanced Scripting", domain: "neutral", category: "Programming", description: "Python development for automation. Libraries: Flask (web), NumPy (data), Matplotlib (viz), Tkinter (GUI), Requests." },
  { id: 16, name: "IoT & Embedded Systems", domain: "neutral", category: "Hardware", description: "Hardware interaction with Arduino, ESP32, Raspberry Pi, and various sensors/actuators." },
  { id: 17, name: "Applied Machine Learning", domain: "neutral", category: "Data", description: "Computer vision models with YOLOv6/v8. Model training, optimization, and deployment." },
];

export const projects = [
  { id: 1, title: "Environmental Monitoring Alerts", description: "Automated alert system via Telegram/SMS/Gmail integrated with IoT sensors.", techStack: ["Python", "IoT", "Sensors", "Flask"], domain: "neutral" },
  { id: 2, title: "Object Detection Models", description: "Trained and deployed YOLOv6 and YOLOv8 models for real-time computer vision applications.", techStack: ["Python", "Machine Learning", "YOLO", "NumPy"], domain: "neutral" },
  { id: 3, title: "TryHackMe Practical Mastery", description: "Practical application of TCM Security methodologies. Mastery of Burp Suite, Nmap, and exploitation toolkits.", techStack: ["Burp Suite", "Nmap", "Metasploit"], domain: "red" },
  { id: 4, title: "FortiGate Network Shield", description: "Designed and implemented secure network boundaries with robust segmentation and VPNs.", techStack: ["FortiGate", "VPN", "Routing", "UFW"], domain: "blue" },
];
