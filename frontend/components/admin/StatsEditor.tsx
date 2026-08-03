"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdminPageHeader from "./shared/AdminPageHeader";

/* ---------------------------------------------------------------
   STATS EDITOR — the "2,000+ / 10,000+ / 0.9s / 99%" strip.
----------------------------------------------------------------*/
export interface StatItem {
  id: string;
  value: string;
  label: string;
}

interface StatsEditorProps {
  initialData: StatItem[];
  onSave?: (data: StatItem[]) => Promise<void> | void;
}

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function StatsEditor({ initialData, onSave }: StatsEditorProps) {
  const [items, setItems] = useState<StatItem[]>(initialData);
  const [saving, setSaving] = useState(false);

  function updateItem(id: string, field: "value" | "label", val: string) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: val } : item)));
  }

  function addItem() {
    setItems((prev) => [...prev, { id: makeId(), value: "", label: "" }]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onSave?.(items);
      // TODO: call your actual updateStats(items) API here
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Stats"
        description="The highlight numbers shown just under the hero."
        actionLabel="Add Stat"
        onAction={addItem}
      />

      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={item.id} className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end">
              <div className="flex-1">
                <Label className="mb-1.5 block text-xs text-zinc-500">Value</Label>
                <Input
                  value={item.value}
                  onChange={(e) => updateItem(item.id, "value", e.target.value)}
                  placeholder="2,000+"
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>
              <div className="flex-[2]">
                <Label className="mb-1.5 block text-xs text-zinc-500">Label</Label>
                <Input
                  value={item.label}
                  onChange={(e) => updateItem(item.id, "label", e.target.value)}
                  placeholder="Daily users served in production"
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => removeItem(item.id)}
                className="border-zinc-700 bg-transparent text-zinc-400 hover:border-red-400/50 hover:bg-transparent hover:text-red-400"
                aria-label={`Remove stat ${index + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}

        {items.length === 0 && (
          <p className="rounded-lg border border-dashed border-zinc-800 p-8 text-center text-sm text-zinc-500">
            No stats yet — click &quot;Add Stat&quot; to create one.
          </p>
        )}
      </div>

      <Button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-6 rounded-full bg-lime-400 text-zinc-950 hover:bg-lime-300 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
