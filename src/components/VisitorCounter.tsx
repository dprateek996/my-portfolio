import { useEffect, useRef } from 'react';
import useSWR from 'swr';
import { Users } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json()).catch(() => ({ count: 0 }));

export default function VisitorCounter() {
    const { data, error, mutate } = useSWR('/api/visitor-count', fetcher);
    const hasCalledRef = useRef(false);

    useEffect(() => {
        try {
            const visited = sessionStorage.getItem('visited');
            if (!visited && !hasCalledRef.current) {
                hasCalledRef.current = true;
                fetch('/api/visitor-count', { method: 'POST' })
                    .then((res) => res.json())
                    .then((newData) => {
                        mutate(newData, false);
                        sessionStorage.setItem('visited', 'true');
                    })
                    .catch(() => {
                        // Silently fail — don't crash the page
                    });
            }
        } catch {
            // sessionStorage may not be available
        }
    }, [mutate]);

    if (!data && !error) return (
        <div className="h-7 w-24 bg-zinc-100 dark:bg-zinc-900/50 rounded-full animate-pulse" />
    );

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition-all hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:scale-105 cursor-default">
            <Users size={12} className="stroke-[2.5px]" />
            <span className="font-mono">{data?.count?.toLocaleString() || 0}</span>
            <span className="hidden sm:inline opacity-80">visitors</span>
        </div>
    );
}
