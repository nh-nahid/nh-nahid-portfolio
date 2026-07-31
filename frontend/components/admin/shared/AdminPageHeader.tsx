import React from "react";
import { Button } from "@/components/ui/button";

/* ---------------------------------------------------------------
   ADMIN PAGE HEADER — consistent title/description/action row used
   at the top of every editor page.
----------------------------------------------------------------*/
interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function AdminPageHeader({
  title,
  description,
  actionLabel,
  onAction,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
        {description && <p className="mt-1 text-sm text-zinc-400">{description}</p>}
      </div>
      {actionLabel && onAction && (
        <Button
          type="button"
          onClick={onAction}
          className="rounded-full bg-lime-400 text-zinc-950 hover:bg-lime-300"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
