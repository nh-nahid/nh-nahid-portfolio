"use client";

import React, { useEffect, useState } from "react";
import api from "@/services/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, FolderKanban, Briefcase, Mail } from "lucide-react";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";

export default function AdminOverview() {
  const [projectCount, setProjectCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);
  const [skillCount, setSkillCount] = useState(0);
  const [educationCount, setEducationCount] = useState(0);
  const [profileName, setProfileName] = useState("Admin");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [projRes, expRes, skillsRes, eduRes, profileRes] = await Promise.all([
          api.get("/projects"),
          api.get("/experiences"),
          api.get("/skills"),
          api.get("/educations"),
          api.get("/profile"),
        ]);

        setProjectCount(projRes.data.data?.length || 0);
        setExperienceCount(expRes.data.data?.length || 0);
        
        // Count skills count as the number of toolbox list items
        const skillsDoc = skillsRes.data.data?.[0];
        const count = (skillsDoc?.toolbox?.length || 0) + (skillsDoc?.orbitTools?.length || 0);
        setSkillCount(count);

        setEducationCount(eduRes.data.data?.length || 0);
        setProfileName(profileRes.data.data?.name || "Admin");
      } catch (err) {
        console.error("Failed to load overview data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Dashboard Overview"
        description="Quick metrics and overview of your portfolio content."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
              <FolderKanban className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium">Projects</p>
              <h3 className="font-display text-2xl font-bold text-white">{projectCount}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium">Experiences</p>
              <h3 className="font-display text-2xl font-bold text-white">{experienceCount}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium">Skills & Tools</p>
              <h3 className="font-display text-2xl font-bold text-white">{skillCount}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium">Education Items</p>
              <h3 className="font-display text-2xl font-bold text-white">{educationCount}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="font-display text-lg font-semibold text-white">
            Welcome back, {profileName}!
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0 text-sm leading-relaxed text-zinc-400">
          <p>
            Use the sidebar navigation to modify various parts of your portfolio site.
            All modifications will update the live site content instantly (subject to Next.js ISR revalidation times).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
