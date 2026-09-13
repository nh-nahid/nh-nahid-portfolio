"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import TechIcon from "@/components/TechIcon";

interface ToolboxGridProps {
  tools: string[];
  /** How many badges to show before collapsing into "+N more" on small screens */
  mobileLimit?: number;
}

export default function ToolboxGrid({
  tools,
  mobileLimit = 14,
}: ToolboxGridProps) {
  const [expanded, setExpanded] = useState(false);

  const hasOverflow = tools.length > mobileLimit;
  const visibleOnMobile = expanded ? tools : tools.slice(0, mobileLimit);
  const hiddenCount = tools.length - mobileLimit;

  return (
    <div>
      {/* Mobile: capped list + "show more" toggle */}
      <div className="flex flex-wrap gap-2.5 sm:hidden">
        {visibleOnMobile.map((tool, idx) => (
          <Badge
            key={`${tool}-${idx}`}
            variant="outline"
            className="group flex max-w-[9.5rem] items-center gap-2 rounded-xl border-zinc-800 bg-zinc-900/70 px-3 py-2 text-xs font-normal text-zinc-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-lime-400/50 hover:bg-zinc-800/90 hover:text-white"
          >
            <TechIcon name={tool} className="h-4 w-4 flex-shrink-0" />
            <span className="font-mono-custom truncate font-medium">{tool}</span>
          </Badge>
        ))}

        {hasOverflow && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-1 rounded-lg border border-dashed border-lime-400/40 bg-lime-400/5 px-2 py-1 text-[10px] font-medium text-lime-400 transition-colors hover:bg-lime-400/10"
          >
            {expanded ? (
              <>
                <Minus className="h-3 w-3" />
                Show less
              </>
            ) : (
              <>
                <Plus className="h-3 w-3" />
                {hiddenCount} more
              </>
            )}
          </button>
        )}
      </div>

      {/* Tablet & up: full list, badges already wrap and have room to breathe */}
      <div className="hidden flex-wrap gap-3 sm:flex">
        {tools.map((tool, idx) => (
          <Badge
            key={`${tool}-${idx}`}
            variant="outline"
            className="group flex max-w-[14rem] items-center gap-2.5 rounded-xl border-zinc-800 bg-zinc-900/70 px-4 py-2.5 text-xs font-normal text-zinc-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-lime-400/50 hover:bg-zinc-800/90 hover:text-white hover:shadow-[0_0_15px_rgba(163,230,53,0.15)]"
          >
            <TechIcon
              name={tool}
              className="h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
            />
            <span className="font-mono-custom truncate font-medium">{tool}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
