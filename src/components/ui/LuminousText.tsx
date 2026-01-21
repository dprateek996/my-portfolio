"use client";

import { cn } from "@/lib/utils";

interface LuminousTextProps {
    children: React.ReactNode;
    className?: string;
}

export const LuminousText = ({ children, className }: LuminousTextProps) => {
    return (
        <div className={cn("relative cursor-default inline-block", className)}>
            {/* 1. Base Text (Readable) */}
            {/* Light Mode: neutral-900 (Black) - heavily darkened as requested */}
            {/* Dark Mode: neutral-600 (Dark Gray) - dim base for glow */}
            <span className="text-neutral-900 dark:text-neutral-600">
                {children}
            </span>

            {/* Shimmer Overlay */}
            <div
                className="absolute inset-0 z-20 pointer-events-none select-none"
                aria-hidden="true"
            >
                {/* 
                    linear-gradient sweep:
                    - Light Mode: White/Silver glint on black text (Metallic effect)
                    - Dark Mode: White glow on dark gray text (Luminous effect)
                */}
                <span className="will-change-[background-position] animate-shine bg-clip-text text-transparent bg-gradient-to-r from-transparent via-white/80 to-transparent bg-[length:200%_100%] block">
                    {children}
                </span>
            </div>
        </div>
    );
};
