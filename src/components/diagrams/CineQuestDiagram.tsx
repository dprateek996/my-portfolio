import { Clapperboard, Sparkles, Trophy, ArrowRight } from "lucide-react";

export const CineQuestDiagram = () => (
    <div className="flex items-center gap-3 md:gap-6 text-zinc-500">
        {/* Step 1: Movie/Cinema */}
        <div className="flex flex-col items-center gap-2 group/step">
            <div className="p-3 rounded-full bg-yellow-500/10 border border-yellow-500/20 group-hover/step:border-yellow-500/50 transition-colors">
                <Clapperboard size={20} className="text-yellow-400" />
            </div>
            <span className="text-[10px] font-mono tracking-tighter">Cinema</span>
        </div>

        {/* Flow Line */}
        <ArrowRight size={14} className="text-zinc-700 animate-pulse" />

        {/* Step 2: AI Processing */}
        <div className="flex flex-col items-center gap-2 group/step">
            <div className="p-3 rounded-full bg-orange-500/10 border border-orange-500/20 group-hover/step:border-orange-500/50 transition-colors">
                <Sparkles size={20} className="text-orange-400" />
            </div>
            <span className="text-[10px] font-mono tracking-tighter">GenAI</span>
        </div>

        {/* Flow Line */}
        <ArrowRight size={14} className="text-zinc-700 animate-pulse delay-75" />

        {/* Step 3: Win/Guess */}
        <div className="flex flex-col items-center gap-2 group/step">
            <div className="p-3 rounded-full bg-green-500/10 border border-green-500/20 group-hover/step:border-green-500/50 transition-colors">
                <Trophy size={20} className="text-green-400" />
            </div>
            <span className="text-[10px] font-mono tracking-tighter">Trivia</span>
        </div>
    </div>
);
