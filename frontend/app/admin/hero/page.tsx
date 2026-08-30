"use client";

import React, { useEffect, useState } from "react";
import HeroForm, { HeroData } from "@/components/admin/HeroForm";
import api from "@/services/api/axios";
import { toast } from "sonner";
import type { Profile } from "@/features/profile/types/profile.types";

export default function HeroAdmin() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    try {
      const res = await api.get("/profile");
      setProfile(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load hero details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function handleSave(data: HeroData) {
    try {
      await api.patch("/profile", {
        name: data.heading,
        title: data.subheading,
        bio: data.description,
        location: data.kicker,
        subtitle: data.preloaderQuote,
      });
      toast.success("Hero section saved successfully!");
      await loadProfile();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save hero section.");
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
        No profile details found to construct hero settings.
      </div>
    );
  }

  const initialHeroData: HeroData = {
    kicker: profile.location || "",
    heading: profile.name || "",
    subheading: profile.title || "",
    description: profile.bio || "",
    preloaderQuote: profile.subtitle || "Code with clarity. Ship with confidence.",
    primaryCtaLabel: "View Work",
    secondaryCtaLabel: "Download CV",
  };

  return <HeroForm initialData={initialHeroData} onSave={handleSave} />;
}
