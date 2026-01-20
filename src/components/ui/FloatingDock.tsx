"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Github, FileText, Mail } from "lucide-react";

const items = [
    {
        icon: Home,
        label: "Top",
        onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    {
        icon: Github,
        label: "GitHub",
        href: "https://github.com/dprateek996",
        external: true
    },
    {
        icon: FileText,
        label: "Resume",
        href: "/resume.pdf",
        external: true
    },
    {
        icon: Mail,
        label: "Email",
        href: "mailto:dprateek996@gmail.com",
        external: true
    },
];

export const FloatingDock = () => {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide when scrolling down fast, show when scrolling up or idle
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                setVisible(false);
            } else {
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <motion.nav
            className="fixed bottom-6 left-1/2 z-50"
            initial={{ y: 100, x: "-50%", opacity: 0 }}
            animate={{
                y: visible ? 0 : 80,
                x: "-50%",
                opacity: visible ? 1 : 0
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <div className="flex items-center gap-1 px-2 py-2 rounded-2xl bg-white/80 dark:bg-zinc-950/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800/50 shadow-lg shadow-black/5 dark:shadow-black/20">
                {items.map((item, i) => {
                    const Icon = item.icon;

                    const content = (
                        <motion.div
                            className="p-2.5 rounded-xl text-neutral-600 dark:text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Icon size={18} strokeWidth={1.5} />
                        </motion.div>
                    );

                    if (item.href) {
                        return (
                            <a
                                key={i}
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                            >
                                {content}
                            </a>
                        );
                    }

                    return (
                        <button key={i} onClick={item.onClick}>
                            {content}
                        </button>
                    );
                })}
            </div>
        </motion.nav>
    );
};
