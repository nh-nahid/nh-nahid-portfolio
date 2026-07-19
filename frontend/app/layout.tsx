import type { Metadata } from "next";

import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
} from "next/font/google";

import "./globals.css";

import ReduxProvider from "@/redux/provider";
import { Toaster } from "sonner";
import SmoothScroll from "@/components/SmoothScroll";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});


const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-custom",
  weight: ["400", "500", "600"],
});


export const metadata: Metadata = {
  title: "Nahid Hossain | Full-Stack Developer",
  description:
    "Portfolio of Nahid Hossain — Full-Stack Developer specializing in React, Next.js, TypeScript, and Node.js.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`
          ${spaceGrotesk.variable}
          ${inter.variable}
          ${jetbrainsMono.variable}
          min-h-full
          flex
          flex-col
          bg-zinc-950
          text-white
          font-body
        `}
      >
        <ReduxProvider>
          <SmoothScroll />
          {children}
          <Toaster
          position="bottom-right"
          richColors
        />
        </ReduxProvider>
      </body>
    </html>
  );
}