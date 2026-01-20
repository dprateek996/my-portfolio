import { LucideIcon } from "lucide-react";
import React from "react";

interface StatusBadgeProps {
    icon: LucideIcon;
    label: string;
    value: string;
    color?: string;
    animate?: boolean;
}

export const StatusBadge = ({ icon: Icon, label, value, color = "text-zinc-400", animate = false }: StatusBadgeProps) => {
    return (
        <div className="flex items-center gap-2 text-sm text-zinc-400 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800/50 hover:border-zinc-700 transition-colors">
            <div className={`relative flex items-center justify-center ${color}`}>
                {animate ? (
                    <>
                        <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping bg-current" />
                        <Icon size={14} className="relative z-10" />
                    </>
                ) : (
                    <Icon size={14} />
                )}
            </div>
            <span className="hidden sm:inline text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</span>
            <span className="font-medium text-zinc-300 truncate max-w-[120px]">{value}</span>
        </div>
    );
};
