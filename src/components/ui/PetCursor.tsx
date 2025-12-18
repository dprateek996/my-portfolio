"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from "framer-motion";

export default function PetCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 1. "Chase" Physics: Lower stiffness & higher damping creates a "catch-up" delay
    const springConfig = { stiffness: 120, damping: 20 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // 2. Movement Tracking: Is the pet actually moving right now?
    const velX = useVelocity(x);
    const [isMoving, setIsMoving] = useState(false);
    const [flip, setFlip] = useState(1);

    // 3. Dynamic Rotation: Leans forward while running
    const rotate = useTransform(velX, [-500, 500], [-15, 15]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Offset so the ferret "chases" a point slightly behind/beside the cursor
            mouseX.set(e.clientX - 40);
            mouseY.set(e.clientY + 20);
        };

        // Update moving state and direction based on velocity
        const unsubscribe = velX.on("change", (v) => {
            if (Math.abs(v) > 5) {
                setIsMoving(true);
                setFlip(v > 0 ? 1 : -1); // Face the direction of movement
            } else {
                setIsMoving(false);
            }
        });

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            unsubscribe();
        };
    }, [mouseX, mouseY, velX]);

    return (
        <motion.div
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                x,
                y,
                rotate,
                scaleX: flip,
                pointerEvents: "none",
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            {/* The "Running/Waddle" Animation */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
                src="/ferret.png" // MAKE SURE THIS IS TRANSPARENT
                alt="Pet"
                style={{ width: "90px", height: "auto" }}
                animate={isMoving ? {
                    y: [0, -8, 0], // The "hop" while running
                    rotate: [0, 5, -5, 0], // The "waddle"
                } : {
                    y: 0,
                    rotate: 0,
                    scale: [1, 1.03, 1] // Gentle breathing while idle
                }}
                transition={isMoving ? {
                    duration: 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                } : {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    );
}
