"use client";

import React, { useEffect, useState } from "react";
import api from "@/services/api/axios";
import { getSkills } from "@/features/skills/api/skill.api";
import type { Skill, SkillCategory } from "@/features/skills/types/skill.types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, X } from "lucide-react";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";

export default function SkillsAdmin() {
  const [skillDoc, setSkillDoc] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [sectionTitle, setSectionTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [orbitInput, setOrbitInput] = useState(""); // comma separated
  const [toolboxInput, setToolboxInput] = useState(""); // comma separated
  const [categories, setCategories] = useState<SkillCategory[]>([]);

  async function loadSkills() {
    try {
      const data = await getSkills();
      const doc = data?.[0];
      if (doc) {
        setSkillDoc(doc);
        setSectionTitle(doc.sectionTitle || "");
        setHeading(doc.heading || "");
        setDescription(doc.description || "");
        setOrbitInput(doc.orbitTools ? doc.orbitTools.join(", ") : "");
        setToolboxInput(doc.toolbox ? doc.toolbox.join(", ") : "");
        setCategories(doc.categories || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load skills settings.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSkills();
  }, []);

  // Category list handlers
  function handleAddCategory() {
    setCategories((prev) => [...prev, { title: "", items: [] }]);
  }

  function handleRemoveCategory(idx: number) {
    setCategories((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleCategoryTitleChange(idx: number, val: string) {
    setCategories((prev) =>
      prev.map((cat, i) => (i === idx ? { ...cat, title: val } : cat))
    );
  }

  function handleCategoryItemsChange(idx: number, val: string) {
    // Splits by newline
    const itemsArray = val.split("\n");
    setCategories((prev) =>
      prev.map((cat, i) => (i === idx ? { ...cat, items: itemsArray } : cat))
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!skillDoc) return;

    setSaving(true);
    try {
      const orbitTools = orbitInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const toolbox = toolboxInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      // Sanitize categories items
      const sanitizedCategories = categories.map((cat) => ({
        title: cat.title,
        items: cat.items.map((it) => it.trim()).filter((it) => it.length > 0),
      }));

      await api.patch(`/skills/${skillDoc._id}`, {
        sectionTitle,
        heading,
        description,
        orbitTools,
        toolbox,
        categories: sanitizedCategories,
      });

      toast.success("Skills section updated successfully!");
      await loadSkills();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save skills settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
      </div>
    );
  }

  if (!skillDoc) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-800 p-8 text-center text-zinc-500">
        No skills document found in database.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Skills & Stack Settings"
        description="Configure the header titles, rotating orbit sphere, toolbox running marquee, and categories."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6 space-y-4">
          <h3 className="font-display font-semibold text-white text-base">Header Texts</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="sectionTitle" className="mb-1.5 block text-xs text-zinc-500 font-medium">Kicker / Section Title</Label>
              <Input
                id="sectionTitle"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div>
              <Label htmlFor="heading" className="mb-1.5 block text-xs text-zinc-500 font-medium">Main Heading</Label>
              <Input
                id="heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="desc" className="mb-1.5 block text-xs text-zinc-500 font-medium">Description Paragraph</Label>
              <Textarea
                id="desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
          </div>
        </Card>

        {/* Orbit and Toolbox */}
        <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6 space-y-4">
          <h3 className="font-display font-semibold text-white text-base">Visual Tool Strips</h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="orbit" className="mb-1.5 block text-xs text-zinc-500 font-medium">Orbit Tools (Icons floating in 3D circle, comma separated)</Label>
              <Textarea
                id="orbit"
                rows={2}
                value={orbitInput}
                onChange={(e) => setOrbitInput(e.target.value)}
                placeholder="React.js, Next.js, Node.js, Express, MongoDB"
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>

            <div>
              <Label htmlFor="toolbox" className="mb-1.5 block text-xs text-zinc-500 font-medium">Toolbox Badges (Running marquee text strip, comma separated)</Label>
              <Textarea
                id="toolbox"
                rows={2}
                value={toolboxInput}
                onChange={(e) => setToolboxInput(e.target.value)}
                placeholder="HTML, CSS, JavaScript, WordPress, Git, Docker"
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
          </div>
        </Card>

        {/* Categories grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-semibold text-white text-lg">Detailed Tool Categories</h3>
            <Button type="button" onClick={handleAddCategory} className="bg-zinc-800 text-white hover:bg-zinc-700 text-xs gap-1.5 rounded-full">
              <Plus className="h-3.5 w-3.5" /> Add Category
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {categories.map((cat, idx) => (
              <Card key={idx} className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-5 space-y-4 relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveCategory(idx)}
                  className="absolute top-2 right-2 text-zinc-500 hover:text-red-400 hover:bg-transparent"
                  aria-label="Remove category"
                >
                  <X className="h-4 w-4" />
                </Button>

                <div>
                  <Label className="mb-1.5 block text-xs text-zinc-500 font-medium">Category Title</Label>
                  <Input
                    value={cat.title}
                    onChange={(e) => handleCategoryTitleChange(idx, e.target.value)}
                    placeholder="e.g. Frontend Development"
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400 pr-10"
                  />
                </div>

                <div>
                  <Label className="mb-1.5 block text-xs text-zinc-500 font-medium">Items / Bullet points (one per line)</Label>
                  <Textarea
                    rows={6}
                    value={cat.items ? cat.items.join("\n") : ""}
                    onChange={(e) => handleCategoryItemsChange(idx, e.target.value)}
                    placeholder="e.g. React.js & Next.js — SPA/SSR web apps&#10;TypeScript — Scalable codebases"
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={saving}
          className="rounded-full bg-lime-400 text-zinc-950 hover:bg-lime-300 font-semibold disabled:opacity-60 px-6"
        >
          {saving ? "Saving..." : "Save Stack Settings"}
        </Button>
      </form>
    </div>
  );
}
