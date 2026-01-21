import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative flex items-center justify-center aspect-square", className)}>
            <svg
                viewBox="0 0 100 100"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-black dark:text-white"
                aria-label="Prateek Dwivedi Logo"
            >
                {/* Slanted Stem (Leaning Right) */}
                <path
                    d="M20 90 L45 90 L65 10 L40 10 Z"
                    className="origin-center transition-all duration-500 ease-out group-hover:skew-x-6 group-hover:fill-neutral-800 dark:group-hover:fill-neutral-200"
                />

                {/* Top Block (The Loop part of P) */}
                {/* Creates a detached geometric feel similar to Artasaka */}
                <path
                    d="M70 10 L100 10 L80 50 L50 50 Z"
                    className="transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:fill-neutral-600 dark:group-hover:fill-neutral-400"
                />
            </svg>
        </div>
    );
};
