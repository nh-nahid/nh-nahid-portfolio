"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Sparkles,
  BarChart3,
  Layers,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Mail,
  LogOut,
} from "lucide-react";

/* ---------------------------------------------------------------
   ADMIN SIDEBAR — fixed nav for the admin panel. Adjust `href`
   values to match wherever you mount these routes (e.g. /admin/*).
----------------------------------------------------------------*/
const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/hero", label: "Hero & Quote", icon: Sparkles },
  { href: "/admin/stats", label: "Stats", icon: BarChart3 },
  { href: "/admin/skills", label: "Skills & Stack", icon: Layers },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/education", label: "Education & Certs", icon: GraduationCap },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

interface AdminSidebarProps {
  onLogout?: () => void;
  className?: string;
}

export default function AdminSidebar({ onLogout, className }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`flex h-full w-64 flex-shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 ${className || ""}`}>
      <div className="flex items-center gap-2 border-b border-zinc-800 px-6 py-5">
        <span className="font-display text-lg font-semibold text-white">
          <span className="text-lime-400">&lt;/&gt;</span> admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-lime-400/10 text-lime-400"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-800 p-3">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
