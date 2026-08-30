"use client";

import React, { useEffect, useState } from "react";
import ProfileForm from "@/components/admin/ProfileForm";
import api from "@/services/api/axios";
import { toast } from "sonner";
import type { Profile } from "@/features/profile/types/profile.types";

export default function ProfileAdmin() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    try {
      const res = await api.get("/profile");
      setProfile(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function handleSave(
    data: Partial<Profile>,
    avatarFile: File | null,
    resumeFile: File | null
  ) {
    try {
      // 1. Update text fields
      await api.patch("/profile", data);

      // 2. Upload avatar if selected
      if (avatarFile) {
        const avatarData = new FormData();
        avatarData.append("avatar", avatarFile);
        await api.patch("/profile/avatar", avatarData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // 3. Upload resume if selected
      if (resumeFile) {
        const resumeData = new FormData();
        resumeData.append("resume", resumeFile);
        await api.patch("/profile/resume", resumeData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      toast.success("Profile saved successfully!");
      await loadProfile(); // reload
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save profile.");
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-800 p-8 text-center text-zinc-500">
        No profile details found in database.
      </div>
    );
  }

  return <ProfileForm initialData={profile} onSave={handleSave} />;
}
