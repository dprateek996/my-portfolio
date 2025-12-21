"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false); // Default to light mode

    // Initialize theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        setIsDark(shouldBeDark);
        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const isScrollingUp = currentScrollY < lastScrollY;

            // Show header if scrolling up OR at the very top
            if (isScrollingUp || currentScrollY < 20) {
                setIsVisible(true);
            } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                // Hide header if scrolling down more than 100px
                setIsVisible(false);
            }

            setIsScrolled(currentScrollY > 20);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);

        if (newIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "py-4 bg-black/50 backdrop-blur-md border-b border-white/5 dark:bg-black/50 dark:border-white/5" : "py-6 bg-transparent border-b border-transparent"}`}
            initial={{ y: 0, opacity: 1 }}
            animate={{
                y: isVisible ? 0 : -100,
                opacity: isVisible ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                {/* Logo */}
                <div className={`${spaceGrotesk.className} flex items-center gap-2`}>
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 dark:border-zinc-800 flex items-center justify-center relative overflow-hidden group">
                        <span className="text-lg font-bold text-white group-hover:scale-110 transition-transform">P</span>
                        <div className="absolute inset-0 bg-accent-500/20 blur-xl group-hover:bg-accent-500/30 transition-colors" />
                    </div>
                    <span className="text-lg font-bold text-black dark:text-white tracking-tight">Prateek</span>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="relative w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors group"
                >
                    <AnimatePresence mode="wait">
                        {isDark ? (
                            <motion.div
                                key="moon"
                                initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Moon size={18} className="text-zinc-400 group-hover:text-white" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sun"
                                initial={{ scale: 0.5, opacity: 0, rotate: 90 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0.5, opacity: 0, rotate: -90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Sun size={18} className="text-yellow-500" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </motion.header>
    );
};
