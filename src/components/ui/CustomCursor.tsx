
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the lagging ring
    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300, mass: 0.5 });
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300, mass: 0.5 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Optional: Check if hovering over clickable elements to change state
            const target = e.target as HTMLElement;
            setIsHovered(!!target.closest("a, button, [role='button']"));
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Don't render on mobile checks usually go here, 
    // but for simplicity we rely on CSS pointer-events or media queries if needed.

    return (
        <>
            {/* The Sharp Dot (Immediate) */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-emerald-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
            />

            {/* The Lagging Ring (Elastic) */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border border-emerald-500/50 rounded-full pointer-events-none z-[9998]"
                style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                    opacity: isHovered ? 0.8 : 0.4,
                    borderColor: isHovered ? "rgb(16, 185, 129)" : "rgba(16, 185, 129, 0.5)"
                }}
                transition={{ duration: 0.2 }}
            />
        </>
    );
};
