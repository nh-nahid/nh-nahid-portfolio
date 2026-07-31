"use client";

import React, { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ---------------------------------------------------------------
   TAG INPUT — chip-style editor for string arrays (toolbox items,
   skill category items, project stack tags, orbit tool labels).
   Type + Enter (or comma) to add, click the x to remove, Backspace
   on an empty field removes the last tag.
----------------------------------------------------------------*/
interface TagInputProps {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  value,
  onChange,
  placeholder = "Type and press Enter",
}: TagInputProps) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const trimmed = draft.trim();
    if (!trimmed || value.includes(trimmed)) {
      setDraft("");
      return;
    }
    onChange([...value, trimmed]);
    setDraft("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !draft && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  }

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-2">
      <div className="flex flex-wrap items-center gap-2">
        {value.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="font-mono-custom flex items-center gap-1 rounded-full border-zinc-700 bg-zinc-950 text-xs font-normal text-zinc-300"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-zinc-500 transition-colors hover:text-lime-400"
              aria-label={`Remove ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={value.length === 0 ? placeholder : ""}
          className="min-w-[140px] flex-1 bg-transparent px-1 py-1 text-sm text-white outline-none placeholder:text-zinc-600"
        />
      </div>
    </div>
  );
}
