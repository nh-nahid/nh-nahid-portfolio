"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface ProjectBulletListProps {
  points: string[];
  mobileLimit?: number;
  desktopLimit?: number;
}

export default function ProjectBulletList({
  points,
  mobileLimit = 2,
  desktopLimit = 3,
}: ProjectBulletListProps) {
  const [expanded, setExpanded] = useState(false);

  function renderList(limit: number) {
    const hasOverflow = points.length > limit;
    const visible = expanded ? points : points.slice(0, limit);
    const hiddenCount = points.length - limit;

    return (
      <>
        <ul className="space-y-1.5">
          {visible.map((point, idx) => (
            <li
              key={idx}
              className="flex gap-2 text-xs leading-relaxed text-zinc-400"
            >
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-lime-400" />
              <span className={expanded ? "" : "line-clamp-2"}>{point}</span>
            </li>
          ))}
        </ul>

        {hasOverflow && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-lime-400 transition-colors hover:text-lime-300"
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
      </>
    );
  }

  return (
    <div className="mt-2">
      <div className="sm:hidden">{renderList(mobileLimit)}</div>
      <div className="hidden sm:block">{renderList(desktopLimit)}</div>
    </div>
  );
}
