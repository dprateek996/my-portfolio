
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from "framer-motion";

export const CyberPet = () => {
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // "Drone" physics - heavy and smooth
    const springConfig = { damping: 25, stiffness: 150, mass: 1 };
    const petX = useSpring(mouseX, springConfig);
    const petY = useSpring(mouseY, springConfig);

    // Lean effect based on velocity
    const velocityX = useVelocity(petX);
    const rotateZ = useTransform(velocityX, [-1000, 1000], [-15, 15]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target as HTMLElement;
            setIsHovered(!!target.closest("a, button, [role='button']"));
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <>
            {/* 1. Precision Dot (The "Command" Pointer) */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-emerald-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
            />

            {/* 2. The Cyber Pet (The "Figure") */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: petX,
                    y: petY,
                    translateX: "-50%",
                    translateY: "-50%",
                    rotate: rotateZ
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovered ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative w-12 h-12 flex items-center justify-center"
                >
                    {/* Outer Orbit Ring */}
                    <motion.div
                        className="absolute inset-0 border border-emerald-500/30 rounded-full border-dashed"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Inner Gyro Ring */}
                    <motion.div
                        className="absolute inset-2 border border-emerald-400/50 rounded-full opacity-60"
                        animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                        transition={{
                            rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />

                    {/* The Core (The "Eye") */}
                    <div className="relative z-10 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]">
                        {/* Pupil / Glint */}
                        <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-80" />
                    </div>

                    {/* Hover "Wings" - Only appear when interactive */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-between px-[-4px]"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            scaleX: isHovered ? 1 : 0
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="w-1 h-4 bg-emerald-500/50 rounded-full" />
                        <div className="w-1 h-4 bg-emerald-500/50 rounded-full" />
                    </motion.div>

                </motion.div>

                {/* Helper Name Label? (Optional - nice touch) */}
                {/* <motion.div className="absolute -bottom-6 w-full text-center text-[8px] font-mono text-emerald-500/50">
            SYSTEM_DRONE
        </motion.div> */}

            </motion.div>
        </>
    );
};
