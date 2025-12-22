import React, { useEffect, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [isDark, setIsDark] = useState<boolean | null>(null);

    // Detect and apply theme immediately on client mount
    useIsomorphicLayoutEffect(() => {
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

    // Simple timer to complete after animation
    useEffect(() => {
        if (isDark === null) return;

        const timer = setTimeout(() => {
            onComplete();
        }, 2000);

        return () => clearTimeout(timer);
    }, [isDark, onComplete]);

    if (isDark === null) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[100] flex flex-col justify-center items-center ${isDark ? "bg-zinc-950" : "bg-white"
                }`}
        >
            {/* Simple pulsing dots using CSS */}
            <div className="flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`h-2.5 w-2.5 rounded-full ${isDark ? "bg-zinc-400" : "bg-zinc-500"
                            }`}
                        style={{
                            animation: `pulse 1s ease-in-out ${i * 0.15}s infinite`,
                        }}
                    />
                ))}
            </div>

            {/* CSS keyframes */}
            <style jsx>{`
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.5;
                    }
                    50% {
                        transform: scale(1.3);
                        opacity: 1;
                    }
                }
            `}</style>
        </motion.div>
    );
};
