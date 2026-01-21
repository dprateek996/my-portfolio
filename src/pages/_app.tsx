import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from '@vercel/analytics/react';
import { TooltipProvider } from "@/components/ui/tooltip";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
      <TooltipProvider>
        <Component {...pageProps} />
        <Analytics />
      </TooltipProvider>
    </div>
  );
}
