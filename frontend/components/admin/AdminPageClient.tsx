"use client";

import React, { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";

import AdminDashboard from "./AdminDashboard";
import ProfileForm, { ProfileData } from "./ProfileForm";
import HeroForm, { HeroData } from "./HeroForm";
import StatsEditor, { StatItem } from "./StatsEditor";
import SkillsEditor, { SkillsData } from "./SkillsEditor";
import ExperienceEditor, { ExperienceItem } from "./ExperienceEditor";
import ProjectsEditor, { ProjectItem } from "./ProjectsEditor";
import EducationCertsEditor, {
  EducationItem,
  CertificationItem,
} from "./EducationCertsEditor";
import MessagesInbox, { ContactMessage } from "./MessagesInbox";

/* ---------------------------------------------------------------
   ADMIN PAGE CLIENT — the single admin panel. Everything lives on
   one page; the sidebar just switches which editor is shown, it
   doesn't navigate between routes. All data + save actions come in
   as props from the server component that fetches them.
----------------------------------------------------------------*/

type Section =
  | "overview"
  | "profile"
  | "hero"
  | "stats"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "messages";

const NAV_ITEMS: { key: Section; label: string; icon: React.ElementType }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "profile", label: "Profile", icon: User },
  { key: "hero", label: "Hero & Quote", icon: Sparkles },
  { key: "stats", label: "Stats", icon: BarChart3 },
  { key: "skills", label: "Skills & Stack", icon: Layers },
  { key: "experience", label: "Experience", icon: Briefcase },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "education", label: "Education & Certs", icon: GraduationCap },
  { key: "messages", label: "Messages", icon: Mail },
];

interface AdminPageClientProps {
  dashboardStats: {
    projects: number;
    experience: number;
    skillCategories: number;
    unreadMessages: number;
  };
  profile: ProfileData;
  hero: HeroData;
  stats: StatItem[];
  skills: SkillsData;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  messages: ContactMessage[];

  onSaveProfile: (data: ProfileData, avatarFile: File | null) => Promise<void>;
  onSaveHero: (data: HeroData) => Promise<void>;
  onSaveStats: (items: StatItem[]) => Promise<void>;
  onSaveSkills: (data: SkillsData) => Promise<void>;
  onSaveExperience: (items: ExperienceItem[]) => Promise<void>;
  onSaveProjects: (items: ProjectItem[], newCoverFiles: Record<string, File>) => Promise<void>;
  onSaveEducationCerts: (
    education: EducationItem[],
    certifications: CertificationItem[]
  ) => Promise<void>;
  onMarkMessageRead: (id: string) => Promise<void>;
  onDeleteMessage: (id: string) => Promise<void>;
}

export default function AdminPageClient({
  dashboardStats,
  profile,
  hero,
  stats,
  skills,
  experience,
  projects,
  education,
  certifications,
  messages,
  onSaveProfile,
  onSaveHero,
  onSaveStats,
  onSaveSkills,
  onSaveExperience,
  onSaveProjects,
  onSaveEducationCerts,
  onMarkMessageRead,
  onDeleteMessage,
}: AdminPageClientProps) {
  const [active, setActive] = useState<Section>("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function go(section: Section) {
    setActive(section);
    setMobileNavOpen(false);
  }

  function renderSection() {
    switch (active) {
      case "overview":
        return <AdminDashboard stats={dashboardStats} />;
      case "profile":
        return <ProfileForm initialData={profile} onSave={onSaveProfile} />;
      case "hero":
        return <HeroForm initialData={hero} onSave={onSaveHero} />;
      case "stats":
        return <StatsEditor initialData={stats} onSave={onSaveStats} />;
      case "skills":
        return <SkillsEditor initialData={skills} onSave={onSaveSkills} />;
      case "experience":
        return <ExperienceEditor initialData={experience} onSave={onSaveExperience} />;
      case "projects":
        return <ProjectsEditor initialData={projects} onSave={onSaveProjects} />;
      case "education":
        return (
          <EducationCertsEditor
            initialEducation={education}
            initialCertifications={certifications}
            onSave={onSaveEducationCerts}
          />
        );
      case "messages":
        return (
          <MessagesInbox
            initialData={messages}
            onMarkRead={onMarkMessageRead}
            onDelete={onDeleteMessage}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {/* desktop sidebar */}
      <aside className="hidden h-screen w-64 flex-shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 md:flex">
        <div className="flex items-center gap-2 border-b border-zinc-800 px-6 py-5">
          <span className="font-display text-lg font-semibold text-white">
            <span className="text-lime-400">&lt;/&gt;</span> admin
          </span>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => go(item.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-lime-400/10 text-lime-400"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* mobile top bar + slide-out nav */}
      <div className="flex flex-1 flex-col md:hidden">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-5 py-4">
          <span className="font-display text-lg font-semibold text-white">
            <span className="text-lime-400">&lt;/&gt;</span> admin
          </span>
          <button
            type="button"
            onClick={() => setMobileNavOpen((v) => !v)}
            className="text-zinc-200"
            aria-label="Toggle admin menu"
          >
            {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileNavOpen && (
          <nav className="space-y-1 border-b border-zinc-800 bg-zinc-950 px-3 py-3">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => go(item.key)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-lime-400/10 text-lime-400"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}

        <main className="flex-1 overflow-y-auto px-5 py-8">{renderSection()}</main>
      </div>

      {/* desktop content */}
      <main className="hidden flex-1 overflow-y-auto px-10 py-10 md:block">
        <div className="mx-auto max-w-5xl">{renderSection()}</div>
      </main>
    </div>
  );
}
