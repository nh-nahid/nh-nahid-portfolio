"use client";

import React, { useEffect, useState } from "react";
import api from "@/services/api/axios";
import { getProjects } from "@/features/projects/api/project.api";
import type { Project } from "@/features/projects/types/project.types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, X, Upload, GripVertical } from "lucide-react";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  function handleDragStart(index: number) {
    setDraggedIndex(index);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  async function handleDrop(targetIndex: number) {
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const reordered = [...projects];
    const [draggedItem] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, draggedItem);

    const updated = reordered.map((proj, idx) => ({
      ...proj,
      order: idx,
    }));

    setProjects(updated);
    setDraggedIndex(null);

    try {
      for (const proj of updated) {
        await api.patch(`/projects/${proj._id}`, { order: proj.order });
      }
      toast.success("Projects reordered successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save project ordering.");
      loadProjects();
    }
  }

  // Form states for Add/Edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");
  const [url, setUrl] = useState("");
  const [github, setGithub] = useState("");
  const [stackInput, setStackInput] = useState(""); // comma separated
  const [pointsInput, setPointsInput] = useState(""); // newline separated
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5050";

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function handleEditClick(project: Project) {
    setEditingId(project._id);
    setName(project.name);
    setSlug(project.slug || "");
    setDesc(project.desc || "");
    setTag(project.tag || "");
    setUrl(project.url || "");
    setGithub(project.github || "");
    setStackInput(project.stack ? project.stack.join(", ") : "");
    setPointsInput(project.points ? project.points.join("\n") : "");
    setFeatured(project.featured || false);
    setOrder(project.order || 0);
    setImageFile(null);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingId(null);
    setName("");
    setSlug("");
    setDesc("");
    setTag("");
    setUrl("");
    setGithub("");
    setStackInput("");
    setPointsInput("");
    setFeatured(false);
    setOrder(0);
    setImageFile(null);
    setShowForm(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !slug || !desc) {
      toast.error("Please fill in Project Name, Slug, and Description.");
      return;
    }

    const payload = new FormData();
    payload.append("name", name);
    payload.append("slug", slug);
    payload.append("desc", desc);
    payload.append("tag", tag);
    payload.append("url", url);
    payload.append("github", github);
    payload.append("featured", String(featured));
    payload.append("order", String(order));

    // Convert stack from commas
    const stackArray = stackInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    stackArray.forEach((s) => payload.append("stack", s));

    // Convert points from newlines
    const pointsArray = pointsInput
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
    pointsArray.forEach((p) => payload.append("points", p));

    if (imageFile) {
      payload.append("image", imageFile);
    }

    try {
      if (editingId) {
        await api.patch(`/projects/${editingId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Project updated successfully!");
      } else {
        await api.post("/projects", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Project created successfully!");
      }
      handleCancel();
      await loadProjects();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save project.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await api.delete(`/projects/${id}`);
      toast.success("Project deleted successfully!");
      await loadProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project.");
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Projects"
        description="Showcase your creations on the landing page."
        actionLabel={showForm ? "Close Form" : "Add Project"}
        onAction={showForm ? handleCancel : () => setShowForm(true)}
      />

      {showForm && (
        <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-display font-semibold text-white">
                {editingId ? "Edit Project" : "Add Project"}
              </h3>
              <Button type="button" variant="ghost" size="icon" onClick={handleCancel}>
                <X className="h-4 w-4 text-zinc-400" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" className="mb-1.5 block text-xs text-zinc-500 font-medium">Project Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingId) {
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                    }
                  }}
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>

              <div>
                <Label htmlFor="slug" className="mb-1.5 block text-xs text-zinc-500 font-medium">Slug URL Identifier</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>

              <div>
                <Label htmlFor="tag" className="mb-1.5 block text-xs text-zinc-500 font-medium">Tag / Kicker</Label>
                <Input
                  id="tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. SaaS Dashboard, E-commerce Mobile App"
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>

              <div>
                <Label htmlFor="order" className="mb-1.5 block text-xs text-zinc-500 font-medium">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>

              <div>
                <Label htmlFor="url" className="mb-1.5 block text-xs text-zinc-500 font-medium">Live Website URL</Label>
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>

              <div>
                <Label htmlFor="github" className="mb-1.5 block text-xs text-zinc-500 font-medium">GitHub Repository URL</Label>
                <Input
                  id="github"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <input
                  id="featured"
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-lime-400 focus:ring-lime-400"
                />
                <Label htmlFor="featured" className="text-xs text-zinc-300">Feature this project on homepage</Label>
              </div>

              <div className="sm:col-span-2">
                <Label className="mb-1.5 block text-xs text-zinc-500 font-medium">Project Cover Image</Label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="coverImage"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-lime-400 hover:text-lime-400"
                  >
                    <Upload className="h-4 w-4" /> Choose Cover Image
                  </label>
                  {imageFile && <span className="text-xs text-lime-400 font-medium">{imageFile.name} (Selected)</span>}
                  <input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="desc" className="mb-1.5 block text-xs text-zinc-500 font-medium">Short Pitch Description</Label>
                <Textarea
                  id="desc"
                  rows={2}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="points" className="mb-1.5 block text-xs text-zinc-500 font-medium">Key Highlights & Accomplishments (One per line)</Label>
                <Textarea
                  id="points"
                  rows={4}
                  value={pointsInput}
                  onChange={(e) => setPointsInput(e.target.value)}
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="stack" className="mb-1.5 block text-xs text-zinc-500 font-medium">Tech Stack (Comma separated)</Label>
                <Input
                  id="stack"
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  placeholder="React, Tailwind CSS, TypeScript, Next.js"
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="outline" onClick={handleCancel} className="border-zinc-700 bg-transparent text-zinc-300">
                Cancel
              </Button>
              <Button type="submit" className="bg-lime-400 text-zinc-950 hover:bg-lime-300 font-semibold">
                {editingId ? "Save Changes" : "Create Project"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Card
            key={project._id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className={`border-zinc-800 bg-zinc-900/40 backdrop-blur-sm overflow-hidden flex flex-col justify-between cursor-grab active:cursor-grabbing transition-all duration-200 ${
              draggedIndex === index ? "opacity-40 scale-[0.98] border-lime-400" : ""
            }`}
          >
            <div>
              {project.coverImage && (
                <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-800 bg-zinc-950">
                  <img
                    src={`${serverUrl}/uploads/projects/${project.coverImage}`}
                    alt={project.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <span className="text-[10px] uppercase font-bold text-lime-400 tracking-wider bg-lime-400/10 px-2 py-0.5 rounded-full border border-lime-400/20">
                  {project.tag}
                </span>
                <h4 className="font-display text-xl font-bold text-white mt-2">{project.name}</h4>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{project.desc}</p>
              </div>
            </div>

            <div className="flex gap-2 p-6 pt-0 justify-end border-t border-zinc-900/60 mt-4">
              <Button type="button" variant="outline" onClick={() => handleEditClick(project)} className="border-zinc-700 bg-transparent text-zinc-400 hover:text-white" size="icon">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" onClick={() => handleDelete(project._id)} className="border-zinc-700 bg-transparent text-zinc-400 hover:border-red-400/50 hover:text-red-400" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}

        {projects.length === 0 && !loading && (
          <div className="rounded-lg border border-dashed border-zinc-800 p-12 text-center text-zinc-500">
            No projects added yet. Click &quot;Add Project&quot; to register one.
          </div>
        )}
      </div>
    </div>
  );
}
