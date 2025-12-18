
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Custom easing function for the counter
        let start = 0;
        const end = 100;
        const duration = 2500;
        const startTime = performance.now();

        const updateCounter = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // EastOutExpo
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            const currentCount = Math.floor(start + (end - start) * ease);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                setTimeout(onComplete, 800);
            }
        };

        requestAnimationFrame(updateCounter);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-zinc-950 text-white"
        >
            <div className="relative w-full max-w-4xl px-6 flex justify-center items-center">

                {/* SVG Number "Figure" */}
                <div className="relative z-10">
                    <svg className="w-full h-auto max-h-[40vh] overflow-visible" viewBox="0 0 400 120">
                        <motion.text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-[120px] font-bold tracking-tighter fill-transparent stroke-zinc-200"
                            strokeWidth="1"
                            initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                            animate={{ strokeDashoffset: 0, fill: "rgba(255, 255, 255, 1)" }}
                            transition={{ duration: 2.5, ease: "easeInOut", fill: { delay: 2, duration: 0.5 } }}
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            {count}%
                        </motion.text>
                    </svg>
                </div>

                {/* Background "Ghost" Number for depth (Optional Renxa style) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none blur-sm">
                    <span className="text-[20vw] font-bold tracking-tighter text-emerald-500">
                        {count}
                    </span>
                </div>

            </div>

            <div className="absolute bottom-12 w-full px-12 flex justify-between items-end text-xs font-mono text-zinc-500/50 uppercase">
                <span>Loading Assets</span>
                <motion.div
                    className="h-[1px] bg-zinc-800 w-64 relative overflow-hidden"
                >
                    <motion.div
                        className="absolute inset-0 bg-emerald-500"
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                </motion.div>
                <span>{count} / 100</span>
            </div>
        </motion.div>
    );
};
