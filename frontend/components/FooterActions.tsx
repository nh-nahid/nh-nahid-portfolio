"use client";

import { ArrowUp } from "lucide-react";

export default function FooterActions() {
  return (
    <div className="flex flex-col items-center gap-4 md:items-end">
      {/* Availability status */}
      <div className="flex items-center gap-2.5 rounded-full border border-lime-400/25 bg-lime-400/8 px-4 py-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
        </span>
        <span className="text-xs font-medium text-lime-300">
          Ready to Build & Scale
        </span>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="group flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-xs text-zinc-400 transition-all duration-200 hover:border-lime-400/50 hover:bg-lime-400/10 hover:text-lime-400"
      >
        <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        Back to top
      </button>
    </div>
  );
}
