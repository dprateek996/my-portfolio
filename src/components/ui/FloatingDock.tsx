"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, User, Briefcase, Mail, Command } from "lucide-react";

const links = [
    { icon: Home, label: "Home", href: "#" },
    { icon: User, label: "About", href: "#about" },
    { icon: Briefcase, label: "Projects", href: "#projects" },
    { icon: Mail, label: "Contact", href: "mailto:dprateek996@gmail.com" },
];

export const FloatingDock = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
        >
            <motion.div
                className="flex gap-1.5 p-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl"
                animate={{
                    padding: scrolled ? "8px" : "6px",
                    gap: scrolled ? "8px" : "6px",
                }}
                transition={{ duration: 0.2 }}
            >
                {links.map((link, i) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="relative group"
                    >
                        <motion.div
                            className="p-2.5 rounded-full text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                            animate={{
                                padding: scrolled ? "12px" : "10px",
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            <link.icon size={scrolled ? 18 : 16} />
                        </motion.div>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded text-[10px] text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {link.label}
                        </span>
                    </Link>
                ))}

                {/* Cmd+K hint */}
                <div className="hidden sm:flex items-center pl-2 pr-3 text-zinc-600 text-[10px] font-mono border-l border-white/10">
                    <Command size={10} className="mr-1" />K
                </div>
            </motion.div>
        </motion.div>
    );
};
