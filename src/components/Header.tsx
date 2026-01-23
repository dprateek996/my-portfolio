"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Logo } from "./ui/Logo";

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

        // eslint-disable-next-line
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

    const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);

        if (!document.startViewTransition) {
            if (newIsDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return;
        }

        const x = e.clientX;
        const y = e.clientY;
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            if (newIsDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        });

        await transition.ready;

        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
            {
                clipPath: clipPath,
            },
            {
                duration: 500,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    };

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "py-4 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50" : "py-6 bg-transparent border-b border-transparent"}`}
            initial={{ y: 0, opacity: 1 }}
            animate={{
                y: isVisible ? 0 : -100,
                opacity: isVisible ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                {/* Logo - Minimal Geometric Icon */}
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Logo className="h-8 w-8" />
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="relative w-8 h-8 rounded-full bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors group"
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
                                <Moon size={16} className="text-zinc-500 group-hover:text-black dark:group-hover:text-white" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sun"
                                initial={{ scale: 0.5, opacity: 0, rotate: 90 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0.5, opacity: 0, rotate: -90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Sun size={16} className="text-zinc-500 group-hover:text-black" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </motion.header>
    );
};
