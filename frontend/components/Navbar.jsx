"use client";

import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { NAV } from "../data/portfolioData";

/* ---------------------------------------------------------------
   NAVBAR — glassmorphism (frosted, translucent, blurred) with a
   shadcn Sheet drawer for the mobile menu.

   Requires shadcn components: button, sheet
     npx shadcn@latest add button sheet
----------------------------------------------------------------*/
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function go(id) {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header
  className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
    scrolled
      ? "border-white/10 bg-zinc-950/70 shadow-lg"
      : "border-white/5 bg-zinc-950/40"
  }`}
>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <button
          onClick={() => go("home")}
          className="font-display text-lg font-semibold tracking-tight text-white"
        >
          <span className="text-lime-400">&lt;/&gt;</span> nahid
          <span className="text-lime-400">.dev</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-lime-400"
            >
              {n.label}
            </button>
          ))}
        </nav>

        <Button
          onClick={() => go("contact")}
          className="hidden rounded-full bg-lime-400 text-zinc-950 hover:bg-lime-300 md:inline-flex"
        >
          Hire Me
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="text-zinc-200 md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-white/10 bg-zinc-950 bg-opacity-90 text-white backdrop-blur-xl"
          >
            <nav className="mt-10 flex flex-col gap-1">
              {NAV.map((n) => (
                <SheetClose asChild key={n.id}>
                  <button
                    onClick={() => go(n.id)}
                    className="rounded-lg px-2 py-3 text-left text-sm font-medium text-zinc-300 transition-colors hover:bg-white hover:bg-opacity-5 hover:text-lime-400"
                  >
                    {n.label}
                  </button>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button
                  onClick={() => go("contact")}
                  className="mt-4 w-full rounded-full bg-lime-400 text-zinc-950 hover:bg-lime-300"
                >
                  Hire Me
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
