"use client";

import React, { useState, useRef, useEffect } from "react";
import { Palette } from "lucide-react";
import { ACCENT_OPTIONS, useThemeAccent } from "@/context/ThemeAccentContext";

export default function ThemeAccentPicker() {
  const { activeAccent, setAccent } = useThemeAccent();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          flex items-center gap-1.5 rounded-full border border-white/10
          bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300
          backdrop-blur-md transition-colors hover:border-white/20 hover:text-white
        "
        title="Change Accent Color"
        aria-label="Theme Accent Picker"
      >
        <Palette className="h-3.5 w-3.5" style={{ color: activeAccent.color }} />
        <span className="hidden sm:inline">Theme</span>
        <span
          className="h-2.5 w-2.5 rounded-full border border-white/20"
          style={{ backgroundColor: activeAccent.color }}
        />
      </button>

      {isOpen && (
        <div
          className="
            absolute right-0 mt-2 w-52 rounded-xl border border-white/15
            bg-zinc-950/95 p-3 shadow-2xl backdrop-blur-xl z-50
            animate-in fade-in zoom-in-95 duration-150
          "
        >
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 text-center">
            Choose Accent Color
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            {ACCENT_OPTIONS.map((opt) => {
              const isActive = activeAccent.key === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => {
                    setAccent(opt.key);
                    setIsOpen(false);
                  }}
                  className={`
                    group relative flex flex-col items-center rounded-lg p-1.5
                    transition-all duration-200 hover:bg-white/10
                    ${isActive ? "bg-white/15 ring-1 ring-white/40" : ""}
                  `}
                  title={opt.name}
                >
                  <span
                    className="h-5 w-5 rounded-full border border-white/20 shadow-sm transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: opt.color }}
                  />
                  <span className="mt-1 text-[10px] text-zinc-300 font-medium capitalize">
                    {opt.key}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
