"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdminPageHeader from "./shared/AdminPageHeader";

/* ---------------------------------------------------------------
   HERO FORM — the kicker/heading/subheading/description that make
   up the hero section, plus the quote shown on the Preloader.
----------------------------------------------------------------*/
export interface HeroData {
  kicker: string;
  heading: string;
  subheading: string;
  description: string;
  preloaderQuote: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
}

interface HeroFormProps {
  initialData: HeroData;
  onSave?: (data: HeroData) => Promise<void> | void;
}

export default function HeroForm({ initialData, onSave }: HeroFormProps) {
  const [form, setForm] = useState<HeroData>(initialData);
  const [saving, setSaving] = useState(false);

  function updateField<K extends keyof HeroData>(key: K, value: HeroData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave?.(form);
      // TODO: call your actual updateHero(form) API here
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Hero & Quote"
        description="The first thing visitors see, plus the quote shown on the loading screen."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
          <CardContent className="grid grid-cols-1 gap-4 p-6">
            <div>
              <Label htmlFor="kicker" className="mb-1.5 block text-xs text-zinc-500">
                Kicker (small line above the heading)
              </Label>
              <Input
                id="kicker"
                value={form.kicker}
                onChange={(e) => updateField("kicker", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div>
              <Label htmlFor="heading" className="mb-1.5 block text-xs text-zinc-500">
                Heading
              </Label>
              <Input
                id="heading"
                value={form.heading}
                onChange={(e) => updateField("heading", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div>
              <Label htmlFor="subheading" className="mb-1.5 block text-xs text-zinc-500">
                Subheading
              </Label>
              <Input
                id="subheading"
                value={form.subheading}
                onChange={(e) => updateField("subheading", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div>
              <Label htmlFor="description" className="mb-1.5 block text-xs text-zinc-500">
                Description
              </Label>
              <Textarea
                id="description"
                rows={4}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="resize-none border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="primaryCta" className="mb-1.5 block text-xs text-zinc-500">
                  Primary button label
                </Label>
                <Input
                  id="primaryCta"
                  value={form.primaryCtaLabel}
                  onChange={(e) => updateField("primaryCtaLabel", e.target.value)}
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>
              <div>
                <Label htmlFor="secondaryCta" className="mb-1.5 block text-xs text-zinc-500">
                  Secondary button label
                </Label>
                <Input
                  id="secondaryCta"
                  value={form.secondaryCtaLabel}
                  onChange={(e) => updateField("secondaryCtaLabel", e.target.value)}
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
          <CardContent className="p-6">
            <Label htmlFor="preloaderQuote" className="mb-1.5 block text-xs text-zinc-500">
              Preloader Quote
            </Label>
            <Textarea
              id="preloaderQuote"
              rows={2}
              value={form.preloaderQuote}
              onChange={(e) => updateField("preloaderQuote", e.target.value)}
              className="resize-none border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
            />
            <p className="mt-2 text-xs text-zinc-600">Shown large, centered, on the loading screen.</p>
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
