import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export const PERSONAL_INFO = {
    name: "Prateek Dwivedi",
    title: "Full Stack Engineer",
    headline: "I learn. I build. I break. I fix. I ship.",
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
        id: "perfume-gallery",
        title: "Perfume Gallery",
        description: "Full-stack e-commerce platform for luxury fragrances. Includes product management, cart logic, and responsive UI.",
        tech: ["React", "Node.js", "Express", "CSS Modules"],
        link: "https://perfume-gallery.prateekdwivedi.me",
        image: "/projects/perfume-gallery.png?v=3",
        gradient: "from-rose-500/20 to-amber-500/20",
    },
    {
        id: "voice-expense-tracker",
        title: "VoEx",
        description: "A financial dashboard that listens. Log expenses via natural language using custom Regex parsing and Web Speech API.",
        tech: ["React", "Node.js", "MongoDB", "Web Speech API"],
        link: "https://voex.prateekdwivedi.me/",
        image: "/projects/voex.png?v=3",
        gradient: "",
    },
    {
        id: "chat-archive",
        title: "ChatArchive",
        description: "Browser extension to export and summarize chat logs into PDF/JSON using local AI processing models.",
        tech: ["JavaScript", "Manifest V3", "GenAI", "Chrome API"],
        link: "https://chromewebstore.google.com/detail/lhibiemihkafdkdkpfolbadmbndphleh?utm_source=item-share-cb",
        image: "/projects/chat-archive.png?v=2",
        gradient: "from-accent-500/20 to-green-500/20",
    },
    {
        id: "cinequest",
        title: "CineQuest",
        description: "Frame-by-frame movie trivia game. Guess Bollywood and Hollywood movies from blurred posters.",
        tech: ["Next.js", "React", "Tailwind", "Gemini API"],
        link: "https://cinequest.prateekdwivedi.me/",
        image: "/projects/cinequest.png?v=3",
        gradient: "",
    },
];

export const EXPERIENCE = [
    {
        company: "Rmak Solutions",
        role: "Software Development Intern",
        date: "May 2024 - Jun 2024",
        bullets: [
            "Increased user engagement by 18% via responsive redesign of the core dashboard.",
            "Reduced MongoDB query time by 25% using optimized aggregation pipelines.",
        ]
    },
];

// Tech stack with SVG icon URLs (using devicons)
export const TECH_STACK = [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

export const EXTRA_PROJECTS = [
    {
        title: "Pinterest Backend",
        description: "Robust REST API for a social image platform. Features Passport.js auth, MongoDB schemas, and session management.",
        tech: ["Node.js", "Express", "MongoDB", "Passport.js"],
        link: "https://github.com/dprateek996/Pinterest-Backend",
        repo: "https://github.com/dprateek996/Pinterest-Backend"
    },
    {
        title: "NexusNote",
        description: "An intelligent productivity canvas for organizing thoughts. Features a sticky-note interface with real-time state management.",
        tech: ["Next.js", "TypeScript", "Tailwind", "Zustand"],
        link: "https://github.com/dprateek996/nexusnote",
        repo: "https://github.com/dprateek996/nexusnote"
    },
    {
        title: "Realtime Tracker",
        description: "Live geolocation tracking application using WebSockets to broadcast user movements in real-time.",
        tech: ["Node.js", "Socket.io", "Leaflet Maps"],
        link: "https://github.com/dprateek996/Realtime-Tracker",
        repo: "https://github.com/dprateek996/Realtime-Tracker"
    },
];

export const CURRENTLY_LEARNING = {
    title: "Building Microservices with Go",
    channel: "Nic Jackson",
    thumbnail: "https://i.ytimg.com/vi/VzBGi_n65iU/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=VzBGi_n65iU",
    progress: 42,
    watching: true
};
