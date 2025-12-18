
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Custom easing function for the counter
        let start = 0;
        const end = 100;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const updateCounter = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // EaseOutQuart easing
            const ease = 1 - Math.pow(1 - progress, 4);

            const currentCount = Math.floor(start + (end - start) * ease);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                setTimeout(onComplete, 500); // Wait a bit at 100%
            }
        };

        requestAnimationFrame(updateCounter);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // smooth bezier
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-zinc-950 p-8 md:p-12"
        >
            {/* Top Section */}
            <div className="flex justify-between items-start text-zinc-500 font-mono text-xs uppercase tracking-widest">
                <span>Portfolio ©2025</span>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span>System Loading</span>
                </div>
            </div>

            {/* Center/Main Content */}
            <div className="flex-1 flex items-center justify-center">
                {/* Optional: Add a subtle graphic or keep purely typographic */}
            </div>

            {/* Bottom Section - The Big Counter */}
            <div className="flex justify-between items-end">
                <div className="text-zinc-500 font-mono text-xs max-w-[150px] hidden md:block">
                    Initializing environment... <br />
                    Loading WebGL assets... <br />
                    Optimizing experience...
                </div>

                <h1 className="text-9xl md:text-[12rem] font-bold text-white tracking-tighter leading-none">
                    {count}%
                </h1>
            </div>
        </motion.div>
    );
};
