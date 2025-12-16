import { motion } from "framer-motion";
import Link from "next/link";
import { Home, User, Briefcase, Mail } from "lucide-react";

const links = [
    { icon: Home, label: "Home", href: "#" },
    { icon: User, label: "About", href: "#about" },
    { icon: Briefcase, label: "Projects", href: "#projects" },
    { icon: Mail, label: "Contact", href: "mailto:dprateek996@gmail.com" },
];

export const FloatingDock = () => {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="flex gap-2 p-2 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 shadow-2xl">
                {links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="p-3 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all relative group"
                    >
                        <link.icon size={20} />
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity">
                            {link.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
