"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function ProjectDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const check = () => {
      const el = ref.current;
      // Only measure while collapsed — once expanded there's no clamp to compare against.
      if (!el || expanded) return;
      setOverflowing(el.scrollHeight > el.clientHeight + 1);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [text, expanded]);

  return (
    <div className="mt-2">
      <p
        ref={ref}
        className={`text-xs leading-relaxed text-zinc-400 ${
          expanded ? "" : "line-clamp-2 sm:line-clamp-3"
        }`}
      >
        {text}
      </p>

      {overflowing && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1 flex items-center gap-1 text-[10px] font-medium text-lime-400 transition-colors hover:text-lime-300"
        >
          {expanded ? (
            <>
              <Minus className="h-3 w-3" />
              less
            </>
          ) : (
            <>
              <Plus className="h-3 w-3" />
              more
            </>
          )}
        </button>
      )}
    </div>
  );
}
