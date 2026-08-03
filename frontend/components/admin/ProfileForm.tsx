"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdminPageHeader from "./shared/AdminPageHeader";

/* ---------------------------------------------------------------
   PROFILE FORM — name, role, contact details, avatar, socials.
----------------------------------------------------------------*/
export interface ProfileData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
  };
}

interface ProfileFormProps {
  initialData: ProfileData;
  onSave?: (data: ProfileData, avatarFile: File | null) => Promise<void> | void;
}

export default function ProfileForm({ initialData, onSave }: ProfileFormProps) {
  const [form, setForm] = useState<ProfileData>(initialData);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(initialData.avatar);
  const [saving, setSaving] = useState(false);

  function updateField<K extends keyof ProfileData>(key: K, value: ProfileData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave?.(form, avatarFile);
      // TODO: call your actual updateProfile(form, avatarFile) API here
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Profile"
        description="Your name, role, and contact details shown across the site."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
          <CardContent className="flex items-center gap-6 p-6">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border border-zinc-800 bg-zinc-950">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Avatar preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-zinc-600">
                  No photo
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="avatar" className="mb-2 block text-xs text-zinc-500">
                Profile photo
              </Label>
              <label
                htmlFor="avatar"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-lime-400 hover:text-lime-400"
              >
                <Upload className="h-4 w-4" /> Upload new photo
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
          <CardContent className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="mb-1.5 block text-xs text-zinc-500">
                Full Name
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div>
              <Label htmlFor="role" className="mb-1.5 block text-xs text-zinc-500">
                Role / Title
              </Label>
              <Input
                id="role"
                value={form.role}
                onChange={(e) => updateField("role", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div>
              <Label htmlFor="email" className="mb-1.5 block text-xs text-zinc-500">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="mb-1.5 block text-xs text-zinc-500">
                Phone
              </Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="location" className="mb-1.5 block text-xs text-zinc-500">
                Location
              </Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div>
              <Label htmlFor="linkedin" className="mb-1.5 block text-xs text-zinc-500">
                LinkedIn URL
              </Label>
              <Input
                id="linkedin"
                value={form.socialLinks.linkedin ?? ""}
                onChange={(e) =>
                  updateField("socialLinks", { ...form.socialLinks, linkedin: e.target.value })
                }
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div>
              <Label htmlFor="github" className="mb-1.5 block text-xs text-zinc-500">
                GitHub URL
              </Label>
              <Input
                id="github"
                value={form.socialLinks.github ?? ""}
                onChange={(e) =>
                  updateField("socialLinks", { ...form.socialLinks, github: e.target.value })
                }
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          disabled={saving}
          className="rounded-full bg-lime-400 text-zinc-950 hover:bg-lime-300 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
