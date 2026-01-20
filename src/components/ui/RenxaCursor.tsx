
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const RenxaCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Set initial position off-screen to avoid jump
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        // 1. High-performance setters
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });

        // 2. State for velocity (squish effect)
        const mousePos = { x: 0, y: 0 };

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Calculate velocity for the "squish"
            const dx = clientX - mousePos.x;
            const dy = clientY - mousePos.y;
            const velocity = Math.sqrt(dx * dx + dy * dy);

            mousePos.x = clientX;
            mousePos.y = clientY;

            // Update position
            xTo(clientX);
            yTo(clientY);

            // Apply the Squish (Scale) based on speed
            // The faster you move, the more it stretches (scaleX) and thins (scaleY)
            const scaleValue = gsap.utils.clamp(1, 1.5, 1 + velocity / 100);

            // Calculate rotation to face movement direction
            const rotation = velocity > 1 ? Math.atan2(dy, dx) * (180 / Math.PI) : 0;

            gsap.to(cursor, {
                scaleX: scaleValue,
                scaleY: 1 / scaleValue,
                rotation: rotation,
                duration: 0.4,
                overwrite: "auto"
            });
        };

        // 3. Hover Logic - Expanded to include standard interactive elements
        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button'], .hover-link")) {
                gsap.to(cursor, {
                    scale: 3,
                    backgroundColor: "rgba(16, 185, 129, 0.1)", // Emerald tint
                    border: "1px solid rgba(16, 185, 129, 0.5)",
                    mixBlendMode: "normal",
                    duration: 0.3,
                });
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button'], .hover-link")) {
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: "white",
                    border: "none",
                    mixBlendMode: "difference",
                    duration: 0.3,
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseEnter);
        window.addEventListener("mouseout", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseEnter);
            window.removeEventListener("mouseout", handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        />
    );
};
