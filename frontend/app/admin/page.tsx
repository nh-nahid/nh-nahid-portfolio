import React from "react";
import type { ProfileData } from "@/components/admin/ProfileForm";
import type { HeroData } from "@/components/admin/HeroForm";
import type { StatItem } from "@/components/admin/StatsEditor";
import type { SkillsData } from "@/components/admin/SkillsEditor";
import type { ExperienceItem } from "@/components/admin/ExperienceEditor";
import type { ProjectItem } from "@/components/admin/ProjectsEditor";
import type { EducationItem, CertificationItem } from "@/components/admin/EducationCertsEditor";
import type { ContactMessage } from "@/components/admin/MessagesInbox";

import { getHome } from "@/features/home/api/home.api";
import { getProfile } from "@/features/profile/api/profile.api";
import { getProjects } from "../api/project.api";
import { getSkills } from "../api/skill.api";
import AdminPageClient from "@/components/admin/AdminPageClient";

/* ---------------------------------------------------------------
   ADMIN PAGE — /admin

   This is the ONLY route. It fetches every piece of content
   server-side, shapes it into what each editor expects, and hands
   it all to <AdminPageClient>, which is the client component that
   actually holds the "which section is showing" state and switches
   between editors without navigating anywhere.

   TODO: add an auth/session check at the top of this file before
   fetching or rendering anything, e.g.:

     const session = await getSession();
     if (!session?.isAdmin) redirect("/login");

   CONFIRMED against your code: getHome, getProfile, getProjects,
   getSkills.
   ASSUMED (not shown to me anywhere): home.hero, home.stats,
   home.experience, and any messages-list endpoint. Adjust the
   fetch calls below if those actually live somewhere else.
----------------------------------------------------------------*/
export default async function AdminPage() {
  const [home, profile, projects, skillsList] = await Promise.all([
    getHome(),
    getProfile(),
    getProjects(),
    getSkills(),
  ]);

  const skills = skillsList[0];

  // ---- shape: profile ------------------------------------------------
  const profileData: ProfileData = {
    name: profile.name ?? "",
    role: profile.role ?? "",
    email: profile.email ?? "",
    phone: profile.phone ?? "",
    location: profile.location ?? "",
    avatar: profile.avatar
      ? `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/${profile.avatar}`
      : undefined,
    socialLinks: {
      linkedin: profile.socialLinks?.linkedin ?? "",
      github: profile.socialLinks?.github ?? "",
    },
  };

  // ---- shape: hero (assumed home.hero) --------------------------------
  const hero = home.hero ?? {};
  const heroData: HeroData = {
    kicker: hero.kicker ?? "",
    heading: hero.heading ?? "",
    subheading: hero.subheading ?? "",
    description: hero.description ?? "",
    preloaderQuote: hero.preloaderQuote ?? "",
    primaryCtaLabel: hero.primaryCtaLabel ?? "View Projects",
    secondaryCtaLabel: hero.secondaryCtaLabel ?? "Email Me",
  };

  // ---- shape: stats (assumed home.stats) -------------------------------
  const statsData: StatItem[] = (home.stats ?? []).map(
    (s: { _id: string; value: string; label: string }) => ({
      id: s._id,
      value: s.value,
      label: s.label,
    })
  );

  // ---- shape: skills ----------------------------------------------------
  const skillsData: SkillsData = {
    sectionTitle: skills?.sectionTitle ?? "",
    heading: skills?.heading ?? "",
    description: skills?.description ?? "",
    categories: (skills?.categories ?? []).map(
      (c: { _id: string; title: string; items: string[] }) => ({
        id: c._id,
        title: c.title,
        items: c.items,
      })
    ),
    orbitTools: skills?.orbitTools ?? [],
    toolbox: skills?.toolbox ?? [],
  };

  // ---- shape: experience (assumed home.experience) -----------------------
  const experienceData: ExperienceItem[] = (home.experience ?? []).map(
    (e: {
      _id: string;
      role: string;
      company: string;
      period: string;
      location: string;
      points: string[];
    }) => ({
      id: e._id,
      role: e.role,
      company: e.company,
      period: e.period,
      location: e.location,
      points: e.points ?? [],
    })
  );

  // ---- shape: projects ----------------------------------------------------
  const projectsData: ProjectItem[] = projects.map(
    (p: {
      _id: string;
      name: string;
      tag: string;
      url: string;
      desc: string;
      points: string[];
      stack: string[];
      coverImage?: string;
    }) => ({
      id: p._id,
      name: p.name,
      tag: p.tag,
      url: p.url,
      desc: p.desc,
      points: p.points ?? [],
      stack: p.stack ?? [],
      coverImage: p.coverImage
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/${p.coverImage}`
        : undefined,
    })
  );

  // ---- shape: education + certifications -----------------------------------
  const educationData: EducationItem[] = (home.education ?? []).map(
    (e: { _id: string; degree: string; school: string; period: string; location: string }) => ({
      id: e._id,
      degree: e.degree,
      school: e.school,
      period: e.period,
      location: e.location,
    })
  );

  const certificationsData: CertificationItem[] = (home.certifications ?? []).map(
    (c: { _id: string; name: string; issuer: string; credentialUrl?: string }) => ({
      id: c._id,
      name: c.name,
      issuer: c.issuer,
      credentialUrl: c.credentialUrl ?? "",
    })
  );

  // ---- shape: messages (no read-API existed anywhere in what you sent) -----
  // TODO: replace with a real call, e.g. const rawMessages = await getMessages();
  const rawMessages: {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
    read: boolean;
  }[] = [];

  const messagesData: ContactMessage[] = rawMessages.map((m) => ({
    id: m._id,
    name: m.name,
    email: m.email,
    subject: m.subject,
    message: m.message,
    createdAt: m.createdAt,
    read: m.read,
  }));

  // ---- dashboard counts -----------------------------------------------------
  const dashboardStats = {
    projects: projectsData.length,
    experience: experienceData.length,
    skillCategories: skillsData.categories.length,
    unreadMessages: messagesData.filter((m) => !m.read).length,
  };

  // -------------------------------------------------------------------------
  // SAVE ACTIONS — every one of these is a Server Action ("use server").
  // They're stubs. Replace the console.log with your actual API calls.
  // -------------------------------------------------------------------------

  async function saveProfile(data: ProfileData, avatarFile: File | null) {
    "use server";
    // TODO: call your actual update-profile endpoint here
    console.log("saveProfile", data, avatarFile?.name);
  }

  async function saveHero(data: HeroData) {
    "use server";
    // TODO: call your actual update-hero endpoint here
    console.log("saveHero", data);
  }

  async function saveStats(items: StatItem[]) {
    "use server";
    // TODO: call your actual update-stats endpoint here
    console.log("saveStats", items);
  }

  async function saveSkills(data: SkillsData) {
    "use server";
    // TODO: call your actual update-skills endpoint here
    console.log("saveSkills", data);
  }

  async function saveExperience(items: ExperienceItem[]) {
    "use server";
    // TODO: call your actual update-experience endpoint here
    console.log("saveExperience", items);
  }

  async function saveProjects(items: ProjectItem[], newCoverFiles: Record<string, File>) {
    "use server";
    // TODO: call your actual update-projects endpoint here.
    // newCoverFiles is keyed by project id — upload each File, then persist
    // the resulting hosted URL in place of the blob: preview.
    console.log("saveProjects", items, Object.keys(newCoverFiles));
  }

  async function saveEducationCerts(
    education: EducationItem[],
    certifications: CertificationItem[]
  ) {
    "use server";
    // TODO: call your actual update-education / update-certifications endpoints here
    console.log("saveEducationCerts", education, certifications);
  }

  async function markMessageRead(id: string) {
    "use server";
    // TODO: call your actual markMessageRead(id) endpoint here
    console.log("markMessageRead", id);
  }

  async function deleteMessage(id: string) {
    "use server";
    // TODO: call your actual deleteMessage(id) endpoint here
    console.log("deleteMessage", id);
  }

  return (
    <AdminPageClient
      dashboardStats={dashboardStats}
      profile={profileData}
      hero={heroData}
      stats={statsData}
      skills={skillsData}
      experience={experienceData}
      projects={projectsData}
      education={educationData}
      certifications={certificationsData}
      messages={messagesData}
      onSaveProfile={saveProfile}
      onSaveHero={saveHero}
      onSaveStats={saveStats}
      onSaveSkills={saveSkills}
      onSaveExperience={saveExperience}
      onSaveProjects={saveProjects}
      onSaveEducationCerts={saveEducationCerts}
      onMarkMessageRead={markMessageRead}
      onDeleteMessage={deleteMessage}
    />
  );
}
