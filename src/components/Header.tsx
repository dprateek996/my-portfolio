
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Space_Grotesk } from "next/font/google";
import { CommandMenu } from "@/components/CommandMenu";
import { Moon, Sun } from "lucide-react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const Header = () => {
    // Placeholder for theme state. 
    // In a real app with next-themes, this would use useTheme()
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        setIsDark(!isDark);
        // Logic to toggle theme class on document/body would go here
        // For this portfolio's 'Dark, Restrained' aesthetic, this might just be a visual toggle for now
        // or we could implement a basic class toggle.
        document.documentElement.classList.toggle('dark');
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }} // Delay to let preloader finish
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 pointer-events-none"
        >
            {/* Left: Minimal Logo */}
            <div className="pointer-events-auto">
                <div className={`${spaceGrotesk.className} text-xl font-bold tracking-tight text-white flex items-center gap-1`}>
                    Prateek
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mb-0.5" />
                </div>
            </div>

            {/* Center: Command Menu */}
            <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 top-6">
                <CommandMenu />
            </div>

            {/* Right: Theme Toggle */}
            <div className="pointer-events-auto">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors backdrop-blur-md"
                    aria-label="Toggle Theme"
                >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </div>
        </motion.header>
    );
};
