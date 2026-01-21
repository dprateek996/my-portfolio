"use client";

import { useEffect, useState } from "react";
import { Youtube } from "lucide-react";
import { SpotlightCard } from "./ui/SpotlightCard";

interface VideoData {
    title: string;
    channel: string;
    thumbnail: string;
    link: string;
    progress: number;
    watching: boolean;
}

export const CurrentlyLearning = () => {
    const [data, setData] = useState<VideoData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/youtube?t=${Date.now()}`);
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error("Failed to fetch YouTube data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <SpotlightCard className="p-4 h-full flex items-center justify-center min-h-[140px]">
                <div className="w-full space-y-3 animate-pulse">
                    <div className="flex justify-between">
                        <div className="h-4 w-20 bg-neutral-800 rounded" />
                        <div className="h-4 w-4 bg-neutral-800 rounded" />
                    </div>
                    <div className="flex gap-3">
                        <div className="w-16 h-16 bg-neutral-800 rounded-lg shrink-0" />
                        <div className="flex-1 space-y-2 py-1">
                            <div className="h-3 w-3/4 bg-neutral-800 rounded" />
                            <div className="h-3 w-1/2 bg-neutral-800 rounded" />
                        </div>
                    </div>
                </div>
            </SpotlightCard>
        );
    }

    if (!data) return null;

    return (
        <a
            href={data.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 group transition-all duration-300 hover:-translate-y-0.5"
        >
            <div className="text-neutral-600 dark:text-zinc-500 group-hover:text-red-500/80 transition-colors duration-300">
                <Youtube size={13} />
            </div>
            <div className="flex flex-col">
                <span className="text-[9px] font-bold text-neutral-600 dark:text-zinc-600 uppercase tracking-wider group-hover:text-neutral-500 dark:group-hover:text-zinc-500 transition-colors">
                    Learning
                </span>
                <span className="text-xs font-medium text-neutral-700 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors truncate max-w-[200px]">
                    {data.title}
                </span>
            </div>
        </a>
    );
};
