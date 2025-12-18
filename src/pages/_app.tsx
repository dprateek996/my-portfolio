import "@/styles/globals.css";
import type { AppProps } from "next/app";
import PetCursor from "@/components/ui/PetCursor";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PetCursor />
      <Component {...pageProps} />
    </>
  );
}
