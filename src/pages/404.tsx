import React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";
import { Seo } from "@/components/Seo";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Custom404() {
    // Apply saved theme on mount so the 404 page matches the user's preference
    React.useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

        if (shouldBeDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    return (
        <main
            className={`min-h-screen bg-white dark:bg-black text-black dark:text-neutral-200 flex items-center justify-center ${inter.className}`}
        >
            <Seo title="404 — Page Not Found" description="This page doesn't exist." />

            <div className="relative w-full max-w-2xl mx-auto px-6 py-20 text-center">
                {/* Ambient glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                    <div className="w-72 h-72 bg-accent-500/10 rounded-full blur-[120px]" />
                </div>

                {/* Animated 404 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1
                        className={`${spaceGrotesk.className} text-[10rem] sm:text-[14rem] font-black leading-none tracking-tighter bg-gradient-to-b from-neutral-300 via-neutral-400 to-neutral-200 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 bg-clip-text text-transparent select-none`}
                    >
                        404
                    </h1>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="-mt-6"
                >
                    <p
                        className={`${spaceGrotesk.className} text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3`}
                    >
                        Page not found
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500 max-w-md mx-auto leading-relaxed mb-10">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        Let&apos;s get you back on track.
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                >
                    <Link
                        href="/"
                        className="group relative inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-neutral-500 dark:hover:border-neutral-500 transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/5"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        >
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                        Back to Home
                    </Link>
                </motion.div>

                {/* Decorative grid dots */}
                <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none opacity-[0.03] dark:opacity-[0.04]">
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                                <circle cx="1" cy="1" r="1" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dots)" />
                    </svg>
                </div>
            </div>
        </main>
    );
}
