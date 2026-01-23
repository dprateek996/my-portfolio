"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Github, Linkedin, Mail, FileText, Monitor } from "lucide-react";

export const CommandMenu = () => {
    const [open, setOpen] = useState(false);

    // Toggle on Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            {/* The Hint - Floating at the bottom */}
            <div className="fixed bottom-10 right-10 z-50 text-xs font-mono text-zinc-500 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-lg backdrop-blur-sm pointer-events-none">
                Press <kbd className="text-zinc-300">⌘</kbd> <kbd className="text-zinc-300">K</kbd> to start
            </div>

            {/* The Palette overlay */}
            {open && (
                <div className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div
                        className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Command className="bg-transparent" loop>
                            <div className="flex items-center border-b border-zinc-800 px-3">
                                <Command.Input
                                    placeholder="What do you need? (e.g. 'View Resume' or 'Contact')"
                                    className="w-full bg-transparent p-4 text-lg text-white outline-none placeholder:text-zinc-500 font-mono"
                                />
                            </div>

                            <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-py-2">
                                <Command.Empty className="py-6 text-center text-sm text-zinc-500">
                                    No results found.
                                </Command.Empty>

                                <Command.Group heading="Navigation" className="text-xs text-zinc-500 font-mono mb-2 px-2">
                                    <Item icon={FileText} text="View Resume" action={() => window.open("/resume.pdf")} />
                                    <Item icon={Mail} text="Send Email" action={() => window.location.href = "mailto:dprateek996@gmail.com"} />
                                </Command.Group>

                                <Command.Group heading="Projects" className="text-xs text-zinc-500 font-mono mb-2 px-2">
                                    <Item icon={Monitor} text="Voice Expense Tracker" action={() => window.open("https://github.com/dprateek996/voice-expense-tracker")} />
                                    <Item icon={Monitor} text="NexusNote" action={() => window.open("https://github.com/dprateek996/nexusnote")} />
                                </Command.Group>

                                <Command.Group heading="Socials" className="text-xs text-zinc-500 font-mono mb-2 px-2">
                                    <Item icon={Github} text="GitHub" action={() => window.open("https://github.com/dprateek996")} />
                                    <Item icon={Linkedin} text="LinkedIn" action={() => window.open("https://linkedin.com/in/prateek-dwivedi-557725212")} />
                                </Command.Group>
                            </Command.List>
                        </Command>
                    </div>
                    {/* Invisible backdrop click to close */}
                    <div className="absolute inset-0 -z-10" onClick={() => setOpen(false)} />
                </div>
            )}
        </>
    );
};

// Helper for items
const Item = ({ icon: Icon, text, action }: { icon: React.ElementType, text: string, action: () => void }) => {
    return (
        <Command.Item
            onSelect={action}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white"
        >
            <Icon size={18} />
            <span>{text}</span>
        </Command.Item>
    );
}
