import { Code } from "lucide-react";

export const CodingStatsCard = () => {
    // Mock Data
    const data = {
        hours: "4.5 hrs",
    };

    return (
        <div className="flex items-center gap-2 group transition-all duration-300 hover:-translate-y-0.5 cursor-default">
            <div className="text-zinc-500 group-hover:text-[#3178C6] transition-colors duration-300">
                <Code size={13} />
            </div>
            <div className="flex flex-col">
                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider group-hover:text-zinc-500 transition-colors">
                    Coding
                </span>
                <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                    {data.hours} today
                </span>
            </div>
        </div>
    );
};
