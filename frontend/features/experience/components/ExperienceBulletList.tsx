"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface ExperienceBulletListProps {
  points: string[];
  /** How many bullets to show before collapsing, on mobile only */
  limit?: number;
}

export default function ExperienceBulletList({
  points,
  limit = 2,
}: ExperienceBulletListProps) {
  const [expanded, setExpanded] = useState(false);
  const hasOverflow = points.length > limit;
  const visible = expanded ? points : points.slice(0, limit);
  const hiddenCount = points.length - limit;

  return (
    <>
      {/* Mobile: capped list + toggle */}
      <ul className="mt-5 space-y-2.5 sm:hidden">
        {visible.map((point, idx) => (
          <li
            key={idx}
            className="flex gap-2.5 text-sm leading-relaxed text-zinc-400"
          >
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-lime-400" />
            <span className="line-clamp-2">{point}</span>
          </li>
        ))}
      </ul>

      {hasOverflow && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2 flex items-center gap-1 text-[11px] font-medium text-lime-400 transition-colors hover:text-lime-300 sm:hidden"
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

      {/* Tablet & up: full list, no truncation */}
      <ul className="mt-5 hidden space-y-2.5 sm:block">
        {points.map((point, idx) => (
          <li
            key={idx}
            className="flex gap-2.5 text-sm leading-relaxed text-zinc-400"
          >
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-lime-400" />
            {point}
          </li>
        ))}
      </ul>
    </>
  );
}
