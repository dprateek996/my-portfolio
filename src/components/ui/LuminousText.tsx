"use client";

import { cn } from "@/lib/utils";

interface LuminousTextProps {
    children: React.ReactNode;
    className?: string;
}

export const LuminousText = ({ children, className }: LuminousTextProps) => {
    return (
        <div className={cn("relative inline-block overflow-hidden", className)}>
            {/* Base Text - slightly dimmer to make the shine pop */}
            <h1 className="relative z-10 text-neutral-500 dark:text-neutral-600">
                {children}
            </h1>

            {/* Shimmer Overlay - Tighter gradient for "one letter to another" effect */}
            <div
                className="absolute inset-0 z-20 pointer-events-none select-none animate-shine"
                aria-hidden="true"
            >
                {/* 
                    linear-gradient sweep:
                    - Light Mode: dark shimmer (via-black)
                    - Dark Mode: light shimmer (via-white)
                */}
                <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-transparent via-black/80 dark:via-white/80 to-transparent bg-[length:200%_100%]">
                    {children}
                </h1>
            </div>

            {/* Removed Ambient Glow as requested */}
        </div>
    );
};
