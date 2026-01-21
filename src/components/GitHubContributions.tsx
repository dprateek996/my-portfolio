import React, { useEffect, useState } from 'react';
import { ArrowUpRight, GitPullRequest, GitMerge, Loader2, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface GitHubEvent {
    id: string;
    type: string;
    created_at: string;
    repo: {
        name: string;
        url: string;
    };
    payload: {
        action: string;
        number: number;
        pull_request?: {
            number: number;
            title: string;
            html_url: string;
            merged: boolean;
            state: string;
        };
    };
}

interface Contribution {
    id: string;
    title: string;
    repo: string;
    url: string;
    date: Date;
    status: 'opened' | 'merged' | 'closed';
}

export const GitHubContributions = () => {
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const fetchGitHubActivity = async () => {
            try {
                // Fetch user events (public activity)
                const response = await fetch('https://api.github.com/users/dprateek996/events?per_page=100');
                if (!response.ok) {
                    console.error('Failed to fetch GitHub events');
                    setLoading(false);
                    return;
                }

                const events: GitHubEvent[] = await response.json();

                // Filter for PullRequestEvents
                const prEvents = events
                    .filter(event => event.type === 'PullRequestEvent')
                    .map(event => {
                        const pr = event.payload.pull_request!;
                        const action = event.payload.action;
                        let status: 'opened' | 'merged' | 'closed' = 'closed';

                        // Check explicit actions
                        if (action === 'opened' || action === 'reopened') {
                            status = 'opened';
                        } else if (action === 'merged' || (action === 'closed' && pr.merged)) {
                            status = 'merged';
                        } else if (pr.state === 'open') {
                            // Fallback for synchronize
                            status = 'opened';
                        }

                        // Fallback title if missing in payload (common in 'merged' events)
                        const title = pr.title || `PR #${pr.number || event.payload.number}`;

                        return {
                            id: event.id,
                            title: title,
                            repo: event.repo.name,
                            url: pr.html_url || `https://github.com/${event.repo.name}/pull/${event.payload.number}`,
                            date: new Date(event.created_at),
                            status
                        };
                    })
                    // Only show Opened or Merged (significant actions)
                    .filter(item => item.status === 'opened' || item.status === 'merged')
                    // Deduplicate by URL (prioritize most recent event by keeping first occurrence)
                    .filter((item, index, self) =>
                        index === self.findIndex((t) => (t.url === item.url))
                    )
                    .slice(0, 5); // Take top 5

                setContributions(prEvents);
            } catch (error) {
                console.error('Error fetching GitHub contributions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubActivity();
    }, []);

    if (loading) return (
        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500 py-4">
            <Loader2 size={12} className="animate-spin" />
            <span>Fetching latest contributions...</span>
        </div>
    );

    if (contributions.length === 0) return null;

    return (
        <div className="w-full mt-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-2 mb-2 group cursor-pointer"
            >
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                        Open Source Contributions <span className="text-neutral-500 dark:text-neutral-500 text-xs ml-1">• {new Date().getFullYear()}</span>
                    </h3>
                </div>
                <div className={`text-neutral-500 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={16} />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col gap-2 pt-2">
                            {contributions.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-neutral-800/50 hover:border-zinc-300 dark:hover:border-neutral-700 bg-zinc-100/60 dark:bg-neutral-900/30 hover:bg-zinc-200/80 dark:hover:bg-neutral-900/80 transition-all duration-300"
                                >
                                    <div className="flex flex-col gap-1 min-w-0 pr-4">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className={`shrink-0 ${item.status === 'merged' ? 'text-purple-400' : 'text-green-400'}`}>
                                                {item.status === 'merged' ? <GitMerge size={14} /> : <GitPullRequest size={14} />}
                                            </span>
                                            <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 truncate group-hover:text-black dark:group-hover:text-white transition-colors">
                                                {item.title}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 pl-6">
                                            <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${item.status === 'merged' ? 'bg-purple-500/10 text-purple-400' : 'bg-green-500/10 text-green-300'}`}>
                                                {item.status === 'merged' ? 'Merged' : 'Open'}
                                            </span>
                                            <span className="text-[11px] text-neutral-500 dark:text-neutral-500 truncate">
                                                to <span className="text-neutral-600 dark:text-neutral-400 font-medium group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">{item.repo}</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 shrink-0">
                                        <span className="text-[10px] text-neutral-500 dark:text-neutral-600 font-mono hidden sm:block">
                                            {format(item.date, 'MMM d')}
                                        </span>
                                        <div className="p-1.5 rounded-md bg-transparent text-neutral-500 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white group-hover:bg-zinc-200 dark:group-hover:bg-neutral-800 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                                            <ArrowUpRight size={14} />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
