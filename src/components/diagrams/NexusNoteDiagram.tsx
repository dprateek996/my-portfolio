import { MousePointer2, LayoutTemplate, Layers, Save } from "lucide-react";

export const NexusNoteDiagram = () => (
    <div className="flex flex-col items-center gap-2 text-zinc-500">

        {/* Top: User Interaction */}
        <div className="flex flex-col items-center gap-1">
            <div className="p-2 bg-zinc-800 rounded-lg border border-zinc-700">
                <MousePointer2 size={16} className="text-pink-400" />
            </div>
            <div className="h-4 w-px bg-zinc-700" />
        </div>

        {/* Middle: The Stack */}
        <div className="grid grid-cols-2 gap-8 relative">
            {/* Connecting Lines */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-zinc-700" />
            <div className="absolute top-0 left-1/4 h-2 w-px bg-zinc-700" />
            <div className="absolute top-0 right-1/4 h-2 w-px bg-zinc-700" />

            {/* Branch 1: UI */}
            <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800">
                    <LayoutTemplate size={18} className="text-indigo-400" />
                </div>
                <span className="text-[10px] font-mono">UI Layer</span>
            </div>

            {/* Branch 2: State */}
            <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800">
                    <Layers size={18} className="text-orange-400" />
                </div>
                <span className="text-[10px] font-mono">Zustand</span>
            </div>
        </div>

        {/* Bottom: Storage */}
        <div className="flex flex-col items-center gap-1 mt-1">
            <div className="h-4 w-px bg-gradient-to-b from-zinc-700 to-transparent" />
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <Save size={12} className="text-emerald-400" />
                <span className="text-[10px] text-emerald-300 font-mono">Local Sync</span>
            </div>
        </div>

    </div>
);
