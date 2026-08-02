import React from "react";
import { FolderKanban, Briefcase, Layers, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AdminPageHeader from "./shared/AdminPageHeader";

/* ---------------------------------------------------------------
   ADMIN DASHBOARD — overview cards. Pass real counts in as props
   from a server component that fetches them.
----------------------------------------------------------------*/
interface AdminDashboardProps {
  stats: {
    projects: number;
    experience: number;
    skillCategories: number;
    unreadMessages: number;
  };
}

const CARDS = [
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "experience", label: "Experience Entries", icon: Briefcase },
  { key: "skillCategories", label: "Skill Categories", icon: Layers },
  { key: "unreadMessages", label: "Unread Messages", icon: Mail },
] as const;

export default function AdminDashboard({ stats }: AdminDashboardProps) {
  return (
    <div>
      <AdminPageHeader
        title="Overview"
        description="A quick snapshot of what's currently on your portfolio."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map(({ key, label, icon: Icon }) => (
          <Card key={key} className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
            <CardContent className="p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-lime-400/10 text-lime-400">
                <Icon className="h-4 w-4" />
              </div>
              <p className="font-display text-3xl font-bold text-white">{stats[key]}</p>
              <p className="mt-1 text-sm text-zinc-400">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
