import { Mic, Server, Database, ArrowRight, BrainCircuit } from "lucide-react";

export const VoiceTrackerDiagram = () => (
    <div className="flex items-center gap-3 md:gap-6 text-zinc-500">
        {/* Step 1: Input */}
        <div className="flex flex-col items-center gap-2 group/step">
            <div className="p-3 rounded-full bg-blue-500/10 border border-blue-500/20 group-hover/step:border-blue-500/50 transition-colors">
                <Mic size={20} className="text-blue-400" />
            </div>
            <span className="text-[10px] font-mono tracking-tighter">Voice</span>
        </div>

        {/* Flow Line */}
        <ArrowRight size={14} className="text-zinc-700 animate-pulse" />

        {/* Step 2: API */}
        <div className="flex flex-col items-center gap-2 group/step">
            <div className="p-3 rounded-full bg-zinc-800/50 border border-zinc-700 group-hover/step:border-zinc-500 transition-colors">
                <Server size={20} className="text-zinc-300" />
            </div>
            <span className="text-[10px] font-mono tracking-tighter">API</span>
        </div>

        {/* Flow Line */}
        <ArrowRight size={14} className="text-zinc-700 animate-pulse delay-75" />

        {/* Step 3: Logic (Regex/AI) */}
        <div className="flex flex-col items-center gap-2 group/step">
            <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20 group-hover/step:border-purple-500/50 transition-colors">
                <BrainCircuit size={20} className="text-purple-400" />
            </div>
            <span className="text-[10px] font-mono tracking-tighter">Parser</span>
        </div>

        {/* Flow Line */}
        <ArrowRight size={14} className="text-zinc-700 animate-pulse delay-150" />

        {/* Step 4: DB */}
        <div className="flex flex-col items-center gap-2 group/step">
            <div className="p-3 rounded-full bg-green-500/10 border border-green-500/20 group-hover/step:border-green-500/50 transition-colors">
                <Database size={20} className="text-green-400" />
            </div>
            <span className="text-[10px] font-mono tracking-tighter">Atlas</span>
        </div>
    </div>
);
