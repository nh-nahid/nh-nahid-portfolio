"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface CategoryBulletListProps {
  items: string[];
  /** How many bullets to show before collapsing, on mobile only */
  limit?: number;
}

export default function CategoryBulletList({
  items,
  limit = 2,
}: CategoryBulletListProps) {
  const [expanded, setExpanded] = useState(false);
  const hasOverflow = items.length > limit;
  const visible = expanded ? items : items.slice(0, limit);
  const hiddenCount = items.length - limit;

  return (
    <>
      {/* Mobile: capped list + toggle */}
      <ul className="space-y-3 sm:hidden">
        {visible.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-relaxed text-zinc-400"
          >
            <span className="text-lime-400">▸</span>
            <span>{item}</span>
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
      <ul className="hidden space-y-3 sm:block">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-relaxed text-zinc-400"
          >
            <span className="text-lime-400">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
