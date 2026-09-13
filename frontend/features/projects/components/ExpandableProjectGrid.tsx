"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ExpandableProjectGridProps {
  children: React.ReactNode[];
  /** How many project cards to show before collapsing, on mobile only */
  mobileLimit?: number;
}

export default function ExpandableProjectGrid({
  children,
  mobileLimit = 3,
}: ExpandableProjectGridProps) {
  const [expanded, setExpanded] = useState(false);
  const total = children.length;
  const hasOverflow = total > mobileLimit;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {children.map((child, idx) => (
          <div
            key={idx}
            className={`h-full ${!expanded && idx >= mobileLimit ? "hidden sm:block" : ""}`}
          >
            {child}
          </div>
        ))}
      </div>

      {hasOverflow && (
        <div className="mt-8 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-full border border-lime-400/30 bg-lime-400/5 px-5 py-2.5 text-sm font-medium text-lime-400 transition-colors hover:bg-lime-400/10"
          >
            {expanded ? "Show less" : `Show ${total - mobileLimit} more projects`}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
