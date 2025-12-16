import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export const PERSONAL_INFO = {
    name: "Prateek Dwivedi",
    title: "Full Stack Engineer",
    headline: "Building scalable systems with a 0→1 mindset.",
    email: "dprateek996@gmail.com",
    socials: [
        { name: "GitHub", href: "https://github.com/dprateek996", icon: Github },
        { name: "LinkedIn", href: "https://linkedin.com/in/prateek-dwivedi-557725212", icon: Linkedin },
        { name: "X (Twitter)", href: "https://x.com/Prateek40593386", icon: Twitter },
        { name: "Email", href: "mailto:dprateek996@gmail.com", icon: Mail },
    ],
};

export const PROJECTS = [
    {
        id: "voice-expense-tracker",
        title: "Voice Expense Tracker",
        description: "A financial dashboard that listens. Log expenses via natural language using custom Regex parsing and Web Speech API.",
        tech: ["React", "Node.js", "MongoDB", "Web Speech API"],
        link: "https://github.com/dprateek996/voice-expense-tracker",
        gradient: "from-blue-500/20 to-cyan-500/20",
        hasArchitectureDiagram: true,
    },
    {
        id: "nexusnote",
        title: "NexusNote",
        description: "An intelligent productivity canvas for organizing thoughts. Features a sticky-note interface with real-time state management.",
        tech: ["Next.js", "TypeScript", "Tailwind", "Zustand"],
        link: "https://github.com/dprateek996/nexusnote",
        gradient: "from-purple-500/20 to-pink-500/20",
        hasArchitectureDiagram: false,
    },
    {
        id: "chat-exporter",
        title: "Chat Exporter AI",
        description: "Browser extension to export and summarize chat logs into PDF/JSON using local AI processing models.",
        tech: ["JavaScript", "Manifest V3", "GenAI", "Chrome API"],
        link: "https://github.com/dprateek996/chat_exporter",
        gradient: "from-emerald-500/20 to-green-500/20",
        hasArchitectureDiagram: false,
    },
];

export const EXPERIENCE = [
    {
        company: "Rmak Solutions",
        role: "Software Development Intern",
        date: "May 2024 - Jun 2024",
        desc: "Engineered a responsive web app boosting engagement by 18%. Optimized MongoDB aggregation pipelines reducing query time by 25%.",
    },
];

export const TECH_STACK = [
    "React", "Next.js", "TypeScript", "Node.js", "AWS", "Docker", "Kubernetes", "MongoDB", "PostgreSQL", "Tailwind", "Redis", "Jenkins"
];
