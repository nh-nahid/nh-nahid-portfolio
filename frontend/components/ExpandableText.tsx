"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface ExpandableTextProps {
  text: string;
  className?: string;
  /** Tailwind line-clamp utilities applied while collapsed, e.g. "line-clamp-5 sm:line-clamp-6" */
  clampClassName?: string;
}

export default function ExpandableText({
  text,
  className = "",
  clampClassName = "line-clamp-5 sm:line-clamp-6",
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const check = () => {
      const el = ref.current;
      // Only measure while collapsed — once expanded there's no clamp to compare against.
      if (!el || expanded) return;
      // If the clamped box is shorter than the real content, it's actually being cut off.
      setOverflowing(el.scrollHeight > el.clientHeight + 1);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [text, expanded]);

  return (
    <div>
      <p
        ref={ref}
        className={`${className} whitespace-pre-line ${
          expanded ? "" : clampClassName
        }`}
      >
        {text}
      </p>

      {overflowing && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mx-auto mt-3 flex items-center gap-1 text-xs font-medium text-lime-400 transition-colors hover:text-lime-300"
        >
          {expanded ? "Show less" : "Read more"}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
    </div>
  );
}
