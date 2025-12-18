
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform, useVelocity } from "framer-motion";

export const SpiritCursor = () => {
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // "Slow" Physics - High mass = heavy/slow
    const springConfig = { damping: 40, stiffness: 150, mass: 3 };
    const figureX = useSpring(mouseX, springConfig);
    const figureY = useSpring(mouseY, springConfig);

    // Animation values for 3D rotation based on velocity (Legs swinging / Body tilting)
    const velocityX = useVelocity(figureX);
    const tiltRotation = useTransform(velocityX, [-1000, 1000], [-25, 25]);
    const legSwing = useTransform(velocityX, [-1000, 1000], [-15, 15]);

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
            {/* 1. Precision Pointer (The "Target") */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-emerald-500 rounded-full pointer-events-none z-[9999] shadow-sm shadow-black/50"
                style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
            />

            {/* 2. The 3D Figure */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: figureX,
                    y: figureY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    className="relative"
                    style={{
                        rotateZ: tiltRotation,
                        perspective: 1000
                    }}
                    animate={{
                        scale: isHovered ? 1.1 : 1,
                    }}
                >
                    {/* SHADOW */}
                    <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-8 h-2 bg-black/20 blur-md rounded-full" />

                    {/* THE BODY (Container) */}
                    <div className="relative w-16 h-20 flex flex-col items-center">

                        {/* HEAD */}
                        <div className="relative z-20 w-12 h-10 bg-gradient-to-br from-white to-zinc-200 rounded-2xl shadow-inner border border-white/50 flex items-center justify-center overflow-hidden">
                            {/* Face Plate */}
                            <div className="w-8 h-4 bg-zinc-900 rounded-full flex items-center justify-center gap-1.5 shadow-inner">
                                {/* Eyes */}
                                {isHovered ? (
                                    <>
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_#34d399]" />
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_#34d399]" />
                                    </>
                                ) : (
                                    <>
                                        <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                                        <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                                    </>
                                )}
                            </div>
                        </div>

                        {/* HEADPHONES/EARS (3D Depth) */}
                        <div className="absolute -left-2 top-2 w-3 h-5 bg-zinc-300 rounded-l-md border-r border-zinc-400 z-10" />
                        <div className="absolute -right-2 top-2 w-3 h-5 bg-zinc-300 rounded-r-md border-l border-zinc-400 z-10" />

                        {/* TORSO */}
                        <div className="relative z-10 -mt-1 w-8 h-9 bg-zinc-800 rounded-b-xl flex justify-center pt-2">
                            <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            </div>
                        </div>

                        {/* ARMS (Floating) */}
                        <motion.div
                            className="absolute -left-3 top-10 w-3 h-6 bg-white rounded-full border border-black/10"
                            style={{ rotate: legSwing }}
                        />
                        <motion.div
                            className="absolute -right-3 top-10 w-3 h-6 bg-white rounded-full border border-black/10"
                            style={{ rotate: useTransform(velocityX, [-1000, 1000], [15, -15]) }}
                        />

                        {/* LEGS (Danging) */}
                        <div className="absolute top-[68px] flex gap-2">
                            <motion.div
                                className="w-2.5 h-6 bg-zinc-400 rounded-full origin-top"
                                style={{ rotateX: legSwing }}
                            >
                                <div className="absolute bottom-0 w-full h-2 bg-white rounded-full" />
                            </motion.div>

                            <motion.div
                                className="w-2.5 h-6 bg-zinc-400 rounded-full origin-top"
                                style={{ rotateX: useTransform(velocityX, [-1000, 1000], [15, -15]) }}
                            >
                                <div className="absolute bottom-0 w-full h-2 bg-white rounded-full" />
                            </motion.div>
                        </div>

                    </div>

                </motion.div>
            </motion.div>
        </>
    );
};
