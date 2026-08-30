"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AdminPageHeader from "./shared/AdminPageHeader";
import type { Profile } from "@/features/profile/types/profile.types";

interface ProfileFormProps {
  initialData: Profile;
  onSave?: (
    data: Partial<Profile>,
    avatarFile: File | null,
    resumeFile: File | null
  ) => Promise<void> | void;
}

export default function ProfileForm({ initialData, onSave }: ProfileFormProps) {
  const [form, setForm] = useState<Profile>({
    ...initialData,
    socialLinks: initialData.socialLinks || { github: "", linkedin: "" },
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5050";
  const avatarPreviewUrl = initialData.avatar
    ? initialData.avatar.startsWith("http")
      ? initialData.avatar
      : `${serverUrl}/uploads/${initialData.avatar}`
    : "";

  const [avatarPreview, setAvatarPreview] = useState<string>(avatarPreviewUrl);
  const [saving, setSaving] = useState(false);

  function updateField<K extends keyof Profile>(key: K, value: Profile[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  function handleResumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFile(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave?.(form, avatarFile, resumeFile);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Profile"
        description="Your name, role, bio, and contact details shown across the site."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload */}
        <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
          <CardContent className="flex items-center gap-6 p-6">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border border-zinc-800 bg-zinc-950">
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-zinc-600">
                  No photo
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="avatar" className="mb-2 block text-xs text-zinc-500 font-medium">
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

        {/* Text Fields */}
        <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
          <CardContent className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="mb-1.5 block text-xs text-zinc-500 font-medium">
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
              <Label htmlFor="title" className="mb-1.5 block text-xs text-zinc-500 font-medium">
                Role / Title
              </Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div>
              <Label htmlFor="email" className="mb-1.5 block text-xs text-zinc-500 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email || ""}
                onChange={(e) => updateField("email", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="mb-1.5 block text-xs text-zinc-500 font-medium">
                Phone
              </Label>
              <Input
                id="phone"
                value={form.phone || ""}
                onChange={(e) => updateField("phone", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="location" className="mb-1.5 block text-xs text-zinc-500 font-medium">
                Location
              </Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>

            {/* Resume Upload */}
            <div className="sm:col-span-2">
              <Label className="mb-1.5 block text-xs text-zinc-500 font-medium">
                Resume PDF
              </Label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="resume"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-lime-400 hover:text-lime-400"
                >
                  <Upload className="h-4 w-4" /> Choose Resume PDF
                </label>
                {resumeFile ? (
                  <span className="text-xs text-lime-400 font-medium">{resumeFile.name} (Selected)</span>
                ) : initialData.resume ? (
                  <span className="text-xs text-zinc-500">Current Resume: {initialData.resume.split("/").pop()}</span>
                ) : (
                  <span className="text-xs text-zinc-600">No PDF uploaded</span>
                )}
                <input
                  id="resume"
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="bio" className="mb-1.5 block text-xs text-zinc-500 font-medium">
                Short Bio (Hero section)
              </Label>
              <Textarea
                id="bio"
                rows={3}
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                className="resize-none border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="about" className="mb-1.5 block text-xs text-zinc-500 font-medium">
                Detailed About Paragraph
              </Label>
              <Textarea
                id="about"
                rows={5}
                value={form.about}
                onChange={(e) => updateField("about", e.target.value)}
                className="resize-none border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div>
              <Label htmlFor="linkedin" className="mb-1.5 block text-xs text-zinc-500 font-medium">
                LinkedIn URL
              </Label>
              <Input
                id="linkedin"
                value={form.socialLinks?.linkedin ?? ""}
                onChange={(e) =>
                  updateField("socialLinks", { ...form.socialLinks, linkedin: e.target.value })
                }
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div>
              <Label htmlFor="github" className="mb-1.5 block text-xs text-zinc-500 font-medium">
                GitHub URL
              </Label>
              <Input
                id="github"
                value={form.socialLinks?.github ?? ""}
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
          className="rounded-full bg-lime-400 text-zinc-950 hover:bg-lime-300 disabled:opacity-60 font-semibold"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
