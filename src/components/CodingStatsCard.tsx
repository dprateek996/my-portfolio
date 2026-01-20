import { Code } from "lucide-react";
import { motion } from "framer-motion";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const CodingStatsCard = () => {
    const { data, error } = useSWR('/api/wakatime', fetcher, {
        refreshInterval: 60000 // Refresh every 60 seconds
    });

    const isLoading = !data && !error;
    const isActive = data?.isActive;

    return (
        <div className="flex items-center gap-2 group transition-all duration-300 hover:-translate-y-0.5 cursor-default">
            <div className={`transition-colors duration-300 ${isActive ? 'text-[#3178C6]' : 'text-neutral-600 dark:text-zinc-500 group-hover:text-[#3178C6]'
                }`}>
                <Code size={13} />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-neutral-600 dark:text-zinc-600 uppercase tracking-wider group-hover:text-neutral-500 dark:group-hover:text-zinc-500 transition-colors">
                        {isActive ? 'Coding' : 'Coded'}
                    </span>
                    {isActive && (
                        <div className="flex items-center gap-0.5 h-2">
                            <motion.div
                                className="w-[1.5px] bg-[#3178C6] rounded-full"
                                animate={{ height: ["20%", "80%", "40%"] }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="w-[1.5px] bg-[#3178C6] rounded-full"
                                animate={{ height: ["60%", "30%", "100%"] }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                            />
                        </div>
                    )}
                </div>
                <span className="text-xs font-medium text-neutral-700 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {isLoading ? 'Loading...' : `${data?.hours || '0 hrs'} ${data?.dateLabel || 'today'}`}
                </span>
            </div>
        </div>
    );
};
