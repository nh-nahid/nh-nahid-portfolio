"use client";

import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeAccentPicker from "@/components/ThemeAccentPicker";


const NAV = [
  {
    id: "home",
    label: "Home",
  },
  {
    id: "about",
    label: "About",
  },
  {
    id: "stack",
    label: "Stack",
  },
  {
    id: "experience",
    label: "Experience",
  },
  {
    id: "projects",
    label: "Projects",
  },
  {
    id: "contact",
    label: "Contact",
  },
];


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };


    window.addEventListener(
      "scroll",
      onScroll
    );


    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);



  function go(id: string) {
    setOpen(false);

    const element =
      document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }


  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">

      <div
        className={`
          mx-auto flex max-w-6xl items-center justify-between
          rounded-full border px-5 py-3
          backdrop-blur-xl transition-all duration-300
          sm:px-8
          ${
            scrolled
              ? "border-white/15 bg-zinc-950/70 shadow-lg shadow-black/20"
              : "border-white/15 bg-zinc-950/40"
          }
        `}
      >

        {/* Logo */}
        <button
          onClick={() => go("home")}
          className="font-display text-lg font-semibold tracking-tight text-white"
        >
          <span className="text-lime-400">
            &lt;/&gt;
          </span>{" "}
          nahid
          <span className="text-lime-400">
            .dev
          </span>
        </button>



        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="
                text-sm font-medium text-zinc-300
                transition-colors
                hover:text-lime-400
              "
            >
              {item.label}
            </button>
          ))}

        </nav>



        {/* Actions (Accent Picker & CTA) */}
        <div className="flex items-center gap-3">
          <ThemeAccentPicker />
          <Button
            onClick={() => go("contact")}
            className="
              hidden rounded-lg
              py-4
              px-6
              bg-lime-400
              text-zinc-950
              hover:bg-lime-300
              md:inline-flex
            "
          >
            Let's Ship It
          </Button>
        </div>




        {/* Mobile Menu */}
        <Sheet
          open={open}
          onOpenChange={setOpen}
        >

          <SheetTrigger
            className="text-zinc-200 md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>


          <SheetContent
            side="right"
            className="
              border-white/10
              bg-zinc-950/90
              text-white
              backdrop-blur-xl
            "
          >

            <nav className="mt-10 flex flex-col gap-1">

              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    go(item.id)
                  }
                  className="
                    rounded-lg px-6 py-3
                    text-left text-sm font-medium
                    text-zinc-300
                    transition-colors
                    hover:bg-white/5
                    hover:text-lime-400
                  "
                >
                  {item.label}
                </button>
              ))}



              <Button
                onClick={() =>
                  go("contact")
                }
                className="
                  mt-4 w-auto self-center rounded-full
                  px-10
                  bg-lime-400
                  text-zinc-950
                  hover:bg-lime-300
                "
              >
                Let's Ship It
              </Button>


            </nav>

          </SheetContent>

        </Sheet>


      </div>

    </header>
  );
}