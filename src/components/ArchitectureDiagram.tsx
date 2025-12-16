import { motion } from "framer-motion";

export const ArchitectureDiagram = () => {
    return (
        <div className="w-full h-full flex items-center justify-center gap-2 p-4 bg-zinc-950/90 rounded-xl backdrop-blur-md">

            {/* Node 1: User Voice */}
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center text-blue-400">
                    🎤
                </div>
                <span className="text-[10px] text-zinc-500 mt-2 font-mono">Input</span>
            </div>

            {/* Animated Path */}
            <div className="w-12 h-[2px] bg-zinc-800 relative overflow-hidden">
                <motion.div
                    animate={{ x: [0, 48] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="w-4 h-full bg-blue-500 blur-[2px]"
                />
            </div>

            {/* Node 2: Web Speech API */}
            <div className="flex flex-col items-center">
                <div className="px-3 py-2 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono">
                    Speech API
                </div>
            </div>

            {/* Animated Path */}
            <div className="w-12 h-[2px] bg-zinc-800 relative overflow-hidden">
                <motion.div
                    animate={{ x: [0, 48] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.75, ease: "linear" }}
                    className="w-4 h-full bg-purple-500 blur-[2px]"
                />
            </div>

            {/* Node 3: Regex Engine */}
            <div className="flex flex-col items-center">
                <div className="px-3 py-2 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-mono">
                    Regex
                </div>
            </div>

        </div>
    );
};
