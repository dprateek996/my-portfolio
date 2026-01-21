import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from '@vercel/analytics/react';
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TooltipProvider>
      <Component {...pageProps} />
      <Analytics />
    </TooltipProvider>
  );
}
