import { Music } from "lucide-react";
import { motion } from "framer-motion";
import useSWR from "swr";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const SpotifyCard = () => {
    const { data, error } = useSWR('/api/spotify', fetcher, {
        refreshInterval: 30000
    });

    const isLoading = !data && !error;
    const isPlaying = data?.isPlaying;

    return (
        <div className="flex items-center gap-2 group transition-all duration-300 hover:-translate-y-0.5 cursor-default">
            {/* Album Art */}
            <div className="relative flex items-center justify-center h-10 w-10 shrink-0 rounded-md overflow-hidden bg-neutral-800">
                {data?.albumImageUrl ? (
                    <Image
                        src={data.albumImageUrl}
                        alt={data.album || "Album art"}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <Music size={16} className="text-zinc-500" />
                )}
            </div>

            {/* Track Info */}
            <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-neutral-600 dark:text-zinc-600 uppercase tracking-wider group-hover:text-neutral-500 dark:group-hover:text-zinc-500 transition-colors">
                        {isLoading ? "Loading..." : (isPlaying ? "Listening" : "Last Played")}
                    </span>
                    {isPlaying && (
                        <div className="flex items-center gap-0.5 h-2">
                            <motion.div
                                className="w-[1.5px] bg-[#1DB954] rounded-full"
                                animate={{ height: ["20%", "80%", "40%"] }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="w-[1.5px] bg-[#1DB954] rounded-full"
                                animate={{ height: ["60%", "30%", "100%"] }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                            />
                        </div>
                    )}
                </div>
                <span className="text-xs font-medium text-neutral-700 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors truncate max-w-[150px]">
                    {isLoading ? "Spotify" : (data?.title || "Not Playing")}
                </span>
            </div>
        </div>
    );
};
