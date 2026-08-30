"use client";

import React, { useEffect, useState } from "react";
import StatsEditor, { StatItem } from "@/components/admin/StatsEditor";
import api from "@/services/api/axios";
import { toast } from "sonner";

export default function StatsAdmin() {
  const [items, setItems] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadStats() {
    try {
      const res = await api.get("/home");
      const rawStats = res.data.data?.stats || [];
      const mappedItems = rawStats.map((s: any, idx: number) => ({
        id: String(idx),
        value: s.value,
        label: s.label,
      }));
      setItems(mappedItems);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load statistics.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  async function handleSave(data: StatItem[]) {
    try {
      const statsPayload = data.map((item) => ({
        value: item.value,
        label: item.label,
      }));

      await api.patch("/home", { stats: statsPayload });
      toast.success("Statistics saved successfully!");
      await loadStats();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save statistics.");
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
      </div>
    );
  }

  return <StatsEditor initialData={items} onSave={handleSave} />;
}
