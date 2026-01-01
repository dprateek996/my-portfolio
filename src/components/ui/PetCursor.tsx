"use client";

import React, { useEffect, useRef } from "react";

export default function PetCursor() {
    const nekoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const nekoEl = nekoRef.current;
        if (!nekoEl) return;

        // State
        let nekoPosX = 32;
        let nekoPosY = 32;
        let mousePosX = 0;
        let mousePosY = 0;
        let frameCount = 0;
        let idleTime = 0;
        let idleAnimation: string | null = null;
        let idleAnimationFrame = 0;
        let forceSleep = false;

        const nekoSpeed = 5; // Normal speed
        const spriteSets: Record<string, number[][]> = {
            idle: [[-3, -3]],
            alert: [[-7, -3]],
            scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
            scratchWallN: [[0, 0], [0, -1]],
            scratchWallS: [[-7, -1], [-6, -2]],
            scratchWallE: [[-2, -2], [-2, -3]],
            scratchWallW: [[-4, 0], [-4, -1]],
            tired: [[-3, -2]],
            sleeping: [[-2, 0], [-2, -1]],
            N: [[-1, -2], [-1, -3]],
            NE: [[0, -2], [0, -3]],
            E: [[-3, 0], [-3, -1]],
            SE: [[-5, -1], [-5, -2]],
            S: [[-6, -3], [-7, -2]],
            SW: [[-5, -3], [-6, -1]],
            W: [[-4, -2], [-4, -3]],
            NW: [[-1, 0], [-1, -1]],
        };

        const setSprite = (name: string, frame: number) => {
            const sprite = spriteSets[name]?.[frame % spriteSets[name].length];
            if (sprite) {
                nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
            }
        };

        const resetIdleAnimation = () => {
            idleAnimation = null;
            idleAnimationFrame = 0;
        };

        const idle = () => {
            idleTime += 1;

            // Force sleep on click
            if (forceSleep) {
                setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
                idleAnimationFrame += 1;
                if (idleAnimationFrame > 64) {
                    forceSleep = false;
                    resetIdleAnimation();
                }
                return;
            }

            // After being idle for a while, do something
            if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation === null) {
                const availableIdleAnimations = ["sleeping", "scratchSelf"];
                idleAnimation = availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
            }

            switch (idleAnimation) {
                case "sleeping":
                    if (idleAnimationFrame < 8) {
                        setSprite("tired", 0);
                        break;
                    }
                    setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
                    if (idleAnimationFrame > 192) {
                        resetIdleAnimation();
                    }
                    break;
                case "scratchSelf":
                    setSprite("scratchSelf", idleAnimationFrame);
                    if (idleAnimationFrame > 9) {
                        resetIdleAnimation();
                    }
                    break;
                default:
                    setSprite("idle", 0);
                    return;
            }
            idleAnimationFrame += 1;
        };

        const frame = () => {
            frameCount += 1;

            const diffX = nekoPosX - mousePosX;
            const diffY = nekoPosY - mousePosY;
            const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

            if (distance < nekoSpeed || distance < 48) {
                idle();
                return;
            }

            idleAnimation = null;
            idleAnimationFrame = 0;

            if (idleTime > 1) {
                setSprite("alert", 0);
                idleTime = Math.min(idleTime, 7);
                idleTime -= 1;
                return;
            }

            let direction = "";
            direction += diffY / distance > 0.5 ? "N" : "";
            direction += diffY / distance < -0.5 ? "S" : "";
            direction += diffX / distance > 0.5 ? "W" : "";
            direction += diffX / distance < -0.5 ? "E" : "";

            // Move toward cursor
            nekoPosX -= (diffX / distance) * nekoSpeed;
            nekoPosY -= (diffY / distance) * nekoSpeed;

            nekoEl.style.left = `${nekoPosX - 16}px`;
            nekoEl.style.top = `${nekoPosY - 16}px`;

            setSprite(direction || "idle", frameCount);
        };

        const onMouseMove = (event: MouseEvent) => {
            mousePosX = event.clientX;
            mousePosY = event.clientY;
        };

        // Click on cat to make it sleep
        const onNekoClick = () => {
            forceSleep = true;
            idleAnimationFrame = 0;
        };

        nekoEl.style.pointerEvents = "auto";
        nekoEl.style.cursor = "pointer";
        nekoEl.addEventListener("click", onNekoClick);
        window.addEventListener("mousemove", onMouseMove);

        // Run at 2x speed (original was speed=5, interval=100)
        const interval = setInterval(frame, 100);

        // Initial position
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;

        return () => {
            nekoEl.removeEventListener("click", onNekoClick);
            window.removeEventListener("mousemove", onMouseMove);
            clearInterval(interval);
        };
    }, []);

    return (
        <div
            ref={nekoRef}
            aria-hidden="true"
            style={{
                width: "32px",
                height: "32px",
                position: "fixed",
                backgroundImage: "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')",
                imageRendering: "pixelated",
                zIndex: 9999,
            }}
        />
    );
}
