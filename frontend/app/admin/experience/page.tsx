"use client";

import React, { useEffect, useState } from "react";
import api from "@/services/api/axios";
import { getExperiences } from "@/features/experience/api/experience.api";
import type { Experience } from "@/features/experience/types/experience.types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, X, Upload, GripVertical } from "lucide-react";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
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

    const reordered = [...experiences];
    const [draggedItem] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, draggedItem);

    const updated = reordered.map((exp, idx) => ({
      ...exp,
      order: idx,
    }));

    setExperiences(updated);
    setDraggedIndex(null);

    try {
      for (const exp of updated) {
        await api.patch(`/experiences/${exp._id}`, { order: exp.order });
      }
      toast.success("Experiences reordered successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save experience ordering.");
      loadExperiences();
    }
  }

  // Form states for Add/Edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState(""); // newline separated
  const [technologiesInput, setTechnologiesInput] = useState(""); // comma separated
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [order, setOrder] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5050";

  async function loadExperiences() {
    try {
      const data = await getExperiences();
      setExperiences(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load experiences.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExperiences();
  }, []);

  function handleEditClick(exp: Experience) {
    setEditingId(exp._id);
    setCompany(exp.company);
    setPosition(exp.role);
    setEmploymentType(exp.employmentType || "Full-time");
    setLocation(exp.location || "");
    setStartDate(exp.startDate ? exp.startDate.substring(0, 10) : "");
    setEndDate(exp.endDate ? exp.endDate.substring(0, 10) : "");
    setCurrentlyWorking(exp.currentlyWorking || false);
    setDescriptionInput(exp.points ? exp.points.join("\n") : "");
    setTechnologiesInput(exp.technologies ? exp.technologies.join(", ") : "");
    setOrder(exp.order || 0);
    setLogoFile(null);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingId(null);
    setCompany("");
    setPosition("");
    setEmploymentType("Full-time");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setCurrentlyWorking(false);
    setDescriptionInput("");
    setTechnologiesInput("");
    setOrder(0);
    setLogoFile(null);
    setShowForm(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!company || !position || !startDate) {
      toast.error("Please fill in Company, Position, and Start Date.");
      return;
    }

    const payload = new FormData();
    payload.append("company", company);
    payload.append("role", position);
    payload.append("employmentType", employmentType);
    payload.append("location", location);
    payload.append("startDate", startDate);
    if (!currentlyWorking && endDate) {
      payload.append("endDate", endDate);
    }
    payload.append("currentlyWorking", String(currentlyWorking));
    payload.append("order", String(order));

    // Convert bullet points from newlines
    const descArray = descriptionInput
      .split("\n")
      .map((d) => d.trim())
      .filter((d) => d.length > 0);
    descArray.forEach((d) => payload.append("points", d));

    // Convert tech from commas
    const techArray = technologiesInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    techArray.forEach((t) => payload.append("technologies", t));

    if (logoFile) {
      payload.append("companyLogo", logoFile);
    }

    try {
      if (editingId) {
        await api.patch(`/experiences/${editingId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Experience updated successfully!");
      } else {
        await api.post("/experiences", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Experience created successfully!");
      }
      handleCancel();
      await loadExperiences();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save experience.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      await api.delete(`/experiences/${id}`);
      toast.success("Experience deleted successfully!");
      await loadExperiences();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete experience.");
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Experience Timeline"
        description="Your employment history shown in the experience timeline."
        actionLabel={showForm ? "Close Form" : "Add Job"}
        onAction={showForm ? handleCancel : () => setShowForm(true)}
      />

      {showForm && (
        <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-display font-semibold text-white">
                {editingId ? "Edit Experience" : "Add Experience"}
              </h3>
              <Button type="button" variant="ghost" size="icon" onClick={handleCancel}>
                <X className="h-4 w-4 text-zinc-400" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="company" className="mb-1.5 block text-xs text-zinc-500 font-medium">Company Name</Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>

              <div>
                <Label htmlFor="position" className="mb-1.5 block text-xs text-zinc-500 font-medium">Position / Role</Label>
                <Input
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>

              <div>
                <Label htmlFor="employmentType" className="mb-1.5 block text-xs text-zinc-500 font-medium">Employment Type</Label>
                <Input
                  id="employmentType"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  placeholder="e.g. Full-time, Freelance"
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>

              <div>
                <Label htmlFor="location" className="mb-1.5 block text-xs text-zinc-500 font-medium">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Dhaka, Bangladesh · Remote"
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>

              <div>
                <Label htmlFor="startDate" className="mb-1.5 block text-xs text-zinc-500 font-medium">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>

              <div>
                <Label htmlFor="endDate" className="mb-1.5 block text-xs text-zinc-500 font-medium">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  disabled={currentlyWorking}
                  value={currentlyWorking ? "" : endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400 disabled:opacity-40"
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <input
                  id="currentlyWorking"
                  type="checkbox"
                  checked={currentlyWorking}
                  onChange={(e) => setCurrentlyWorking(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-lime-400 focus:ring-lime-400"
                />
                <Label htmlFor="currentlyWorking" className="text-xs text-zinc-300">I currently work here</Label>
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

              <div className="sm:col-span-2">
                <Label className="mb-1.5 block text-xs text-zinc-500 font-medium">Company Logo Image</Label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="logo"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-lime-400 hover:text-lime-400"
                  >
                    <Upload className="h-4 w-4" /> Choose Logo File
                  </label>
                  {logoFile && <span className="text-xs text-lime-400 font-medium">{logoFile.name} (Selected)</span>}
                  <input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="desc" className="mb-1.5 block text-xs text-zinc-500 font-medium">Description (Bullet points, one per line)</Label>
                <Textarea
                  id="desc"
                  rows={4}
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="tech" className="mb-1.5 block text-xs text-zinc-500 font-medium">Technologies used (Comma separated)</Label>
                <Input
                  id="tech"
                  value={technologiesInput}
                  onChange={(e) => setTechnologiesInput(e.target.value)}
                  placeholder="React, Next.js, Node.js, Express, MongoDB"
                  className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="outline" onClick={handleCancel} className="border-zinc-700 bg-transparent text-zinc-300">
                Cancel
              </Button>
              <Button type="submit" className="bg-lime-400 text-zinc-950 hover:bg-lime-300 font-semibold">
                {editingId ? "Save Changes" : "Create Experience"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <Card
            key={exp._id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className={`border-zinc-800 bg-zinc-900/40 backdrop-blur-sm overflow-hidden cursor-grab active:cursor-grabbing transition-all duration-200 ${
              draggedIndex === index ? "opacity-40 scale-[0.98] border-lime-400" : ""
            }`}
          >
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-zinc-850 bg-zinc-950 flex items-center justify-center">
                  {exp.companyLogo ? (
                    <img
                      src={`${serverUrl}/uploads/company-logos/${exp.companyLogo}`}
                      alt={exp.company}
                      className="h-full w-full object-contain p-2"
                    />
                  ) : (
                    <span className="text-[10px] text-zinc-600 font-bold">Logo</span>
                  )}
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-white">{exp.role}</h4>
                  <p className="text-sm text-lime-400">{exp.company} · <span className="text-zinc-500 text-xs">{exp.location}</span></p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {exp.startDate ? new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""} -{" "}
                    {exp.currentlyWorking ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <Button type="button" variant="outline" onClick={() => handleEditClick(exp)} className="border-zinc-700 bg-transparent text-zinc-400 hover:text-white" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" onClick={() => handleDelete(exp._id)} className="border-zinc-700 bg-transparent text-zinc-400 hover:border-red-400/50 hover:text-red-400" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {experiences.length === 0 && !loading && (
          <div className="rounded-lg border border-dashed border-zinc-800 p-12 text-center text-zinc-500">
            No work experience recorded. Click &quot;Add Job&quot; to register one.
          </div>
        )}
      </div>
    </div>
  );
}
