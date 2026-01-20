
import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export const HologramCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    // Motion values for rotation
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the rotation
    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    // Create the transform template
    const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg) scale(1.02)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation (range: -10 to 10 degrees)
        const xPct = (mouseY / height - 0.5) * -20;
        const yPct = (mouseX / width - 0.5) * 20;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform }}
            className={`relative rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden transform-gpu transition-all duration-200 ${className}`}
        >
            {/* Holographic Sheen/Glare */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none z-20"
                style={{
                    background: "linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.4) 40%, rgba(220, 255, 220, 0.3) 45%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)",
                    filter: "brightness(1.2) contrast(1.2)",
                    mixBlendMode: "overlay"
                }}
            />

            {/* Content Container with slight Z translation for depth */}
            <div className="relative z-10 h-full" style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>

        </motion.div>
    );
};
