import { FaGithub, FaLinkedin, FaFacebook, FaWhatsapp } from "react-icons/fa";
import FooterActions from "./FooterActions";

const SOCIAL_LINKS = [
  { icon: FaGithub,   label: "GitHub",   href: "https://github.com/nh-nahid" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com/in/nahid-nh" },
  { icon: FaFacebook, label: "Facebook", href: "https://facebook.com/nh.nahid.h" },
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/8801617121519" },
];

const STATS = [
  { value: "5+",  label: "Projects\nShipped" },
  { value: "2k+", label: "Daily\nUsers" },
  { value: "2",   label: "Companies\nWorked" },
  { value: "1",   label: "Recommendation\nLetter" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-40 border-t border-zinc-800/60 pb-2">
      {/* Gradient glow line at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* ── Main footer row — 3 columns */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-3 md:gap-8">

          {/* LEFT — Brand + tagline + socials */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <p className="font-display text-lg font-bold tracking-tight text-white">
              <span className="text-lime-400">&lt;/&gt;</span>{" "}
              nahid<span className="text-lime-400">.dev</span>
            </p>
            <p className="max-w-xs text-center text-xs leading-relaxed text-zinc-500 md:text-left">
              Fullstack Developer crafting fast, scalable, and accessible web experiences.
            </p>
            <div className="mt-1 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-all duration-200 hover:border-lime-400/50 hover:bg-lime-400/10 hover:text-lime-400"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* MIDDLE — Key Stats */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
              By the numbers
            </p>
            <div className="flex flex-row items-center gap-2">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex w-20 flex-col items-center gap-0.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 py-2.5 text-center"
                >
                  <span className="font-display text-base font-bold text-lime-400">
                    {value}
                  </span>
                  <span className="text-[9px] leading-tight text-zinc-500 whitespace-pre-line">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Availability + Back to top */}
          <div className="flex items-center justify-center md:justify-end">
            <FooterActions />
          </div>

        </div>

        {/* ── Bottom bar — centered copyright */}
        <div className="flex items-center justify-center border-t border-zinc-800/60 py-4">
          <p className="text-[11px] text-zinc-500">
            © {year} Nahid Hossain. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
