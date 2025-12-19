import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                zinc: {
                    850: "#1f1f22",
                    900: "#18181b",
                    950: "#09090b",
                },
                // Accent colors using CSS variables (defined in globals.css)
                accent: {
                    300: "var(--accent-300)",
                    400: "var(--accent-400)",
                    500: "var(--accent-500)",
                }
            },
            animation: {
                "infinite-scroll": "infinite-scroll 25s linear infinite",
                "spotlight": "spotlight 2s ease .75s 1 forwards",
            },
            keyframes: {
                "infinite-scroll": {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-50%)" },
                },
                spotlight: {
                    "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
                    "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
