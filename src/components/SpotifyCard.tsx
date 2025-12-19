import { Music } from "lucide-react";
import { motion } from "framer-motion";

export const SpotifyCard = () => {
    // Mock Data
    const data = {
        isPlaying: true,
        title: "Starboy",
        artist: "The Weeknd",
        link: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB"
    };

    return (
        <a
            href={data.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 group transition-all duration-300 hover:-translate-y-0.5"
        >
            <div className="relative text-zinc-500 group-hover:text-[#1DB954] transition-colors duration-300">
                {data.isPlaying ? (
                    <div className="flex items-end gap-[2px] h-3 w-3">
                        <motion.div
                            className="w-[2px] bg-current rounded-full"
                            animate={{ height: ["20%", "80%", "40%"] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="w-[2px] bg-current rounded-full"
                            animate={{ height: ["60%", "30%", "100%"] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                        />
                        <motion.div
                            className="w-[2px] bg-current rounded-full"
                            animate={{ height: ["40%", "90%", "30%"] }}
                            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        />
                    </div>
                ) : (
                    <Music size={13} />
                )}
            </div>
            <div className="flex flex-col">
                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider group-hover:text-zinc-500 transition-colors">
                    Listening
                </span>
                <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors truncate max-w-[150px]">
                    {data.title}
                </span>
            </div>
        </a>
    );
};
