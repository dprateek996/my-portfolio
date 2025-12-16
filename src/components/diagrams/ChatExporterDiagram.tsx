import { Globe, ScanSearch, Bot, FileText, ArrowRight } from "lucide-react";

export const ChatExporterDiagram = () => (
    <div className="relative flex items-center justify-center p-4">
        {/* Rotating Border Ring (Visual Flair) */}
        <div className="absolute inset-0 border border-zinc-800 rounded-full opacity-20 animate-[spin_10s_linear_infinite]" />

        <div className="flex items-center gap-4 relative z-10">

            {/* Step 1: DOM Source */}
            <div className="flex flex-col items-center gap-1">
                <Globe size={18} className="text-cyan-400" />
                <span className="text-[9px] uppercase tracking-wider text-zinc-500">DOM</span>
            </div>

            <ArrowRight size={14} className="text-zinc-700" />

            {/* Step 2: Extraction Script */}
            <div className="relative">
                <div className="absolute -inset-2 bg-emerald-500/20 blur-lg rounded-full" />
                <div className="p-2 bg-zinc-900 border border-emerald-500/30 rounded-lg relative">
                    <ScanSearch size={20} className="text-emerald-400" />
                </div>
            </div>

            <ArrowRight size={14} className="text-zinc-700" />

            {/* Step 3: GenAI Processing */}
            <div className="flex flex-col items-center gap-1">
                <Bot size={18} className="text-amber-400" />
                <span className="text-[9px] uppercase tracking-wider text-zinc-500">AI</span>
            </div>

            <ArrowRight size={14} className="text-zinc-700" />

            {/* Step 4: Output */}
            <div className="flex flex-col items-center gap-1">
                <FileText size={18} className="text-red-400" />
                <span className="text-[9px] uppercase tracking-wider text-zinc-500">PDF</span>
            </div>

        </div>
    </div>
);
