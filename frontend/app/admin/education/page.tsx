"use client";

import React, { useEffect, useState } from "react";
import api from "@/services/api/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, X, ExternalLink, GripVertical, Upload } from "lucide-react";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";

interface EducationItem {
  _id: string;
  degree: string;
  school: string;
  period: string;
  location: string;
  order: number;
}

interface CertificationItem {
  _id: string;
  name: string;
  issuer: string;
  description?: string;
  url?: string;
  order?: number;
  coverImage?: string;
}

interface CourseItem {
  _id: string;
  name: string;
  platform: string;
  category: string;
  description?: string;
  logo?: string;
  order: number;
}

export default function EducationCertsAdmin() {
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedEduIndex, setDraggedEduIndex] = useState<number | null>(null);
  const [draggedCertIndex, setDraggedCertIndex] = useState<number | null>(null);
  const [draggedCourseIndex, setDraggedCourseIndex] = useState<number | null>(null);

  function handleDragStartEdu(index: number) {
    setDraggedEduIndex(index);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  async function handleDropEdu(targetIndex: number) {
    if (draggedEduIndex === null || draggedEduIndex === targetIndex) return;

    const reordered = [...educations];
    const [draggedItem] = reordered.splice(draggedEduIndex, 1);
    reordered.splice(targetIndex, 0, draggedItem);

    const updated = reordered.map((edu, idx) => ({
      ...edu,
      order: idx,
    }));

    setEducations(updated);
    setDraggedEduIndex(null);

    try {
      for (const edu of updated) {
        await api.patch(`/educations/${edu._id}`, { order: edu.order });
      }
      toast.success("Education ordering updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save education ordering.");
      loadData();
    }
  }

  function handleDragStartCert(index: number) {
    setDraggedCertIndex(index);
  }

  async function handleDropCert(targetIndex: number) {
    if (draggedCertIndex === null || draggedCertIndex === targetIndex) return;

    const reordered = [...certifications];
    const [draggedItem] = reordered.splice(draggedCertIndex, 1);
    reordered.splice(targetIndex, 0, draggedItem);

    const updated = reordered.map((cert, idx) => ({
      ...cert,
      order: idx,
    }));

    setCertifications(updated);
    setDraggedCertIndex(null);

    try {
      for (const cert of updated) {
        await api.patch(`/certifications/${cert._id}`, { order: cert.order });
      }
      toast.success("Certifications reordered!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save certification ordering.");
      loadData();
    }
  }

  function handleDragStartCourse(index: number) {
    setDraggedCourseIndex(index);
  }

  async function handleDropCourse(targetIndex: number) {
    if (draggedCourseIndex === null || draggedCourseIndex === targetIndex) return;

    const reordered = [...courses];
    const [draggedItem] = reordered.splice(draggedCourseIndex, 1);
    reordered.splice(targetIndex, 0, draggedItem);

    const updated = reordered.map((course, idx) => ({
      ...course,
      order: idx,
    }));

    setCourses(updated);
    setDraggedCourseIndex(null);

    try {
      for (const course of updated) {
        await api.patch(`/courses/${course._id}`, { order: course.order });
      }
      toast.success("Courses reordered successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save course ordering.");
      loadData();
    }
  }

  // Form states - Education
  const [showEduForm, setShowEduForm] = useState(false);
  const [eduId, setEduId] = useState<string | null>(null);
  const [degree, setDegree] = useState("");
  const [school, setSchool] = useState("");
  const [eduPeriod, setEduPeriod] = useState("");
  const [eduLocation, setEduLocation] = useState("");
  const [eduOrder, setEduOrder] = useState(0);

  // Form states - Certification
  const [showCertForm, setShowCertForm] = useState(false);
  const [certId, setCertId] = useState<string | null>(null);
  const [certName, setCertName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [certDesc, setCertDesc] = useState("");
  const [certUrl, setCertUrl] = useState("");
  const [certCoverFile, setCertCoverFile] = useState<File | null>(null);
  const [certOrder, setCertOrder] = useState(0);

  // Form states - Course
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [courseName, setCourseName] = useState("");
  const [coursePlatform, setCoursePlatform] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseLogoFile, setCourseLogoFile] = useState<File | null>(null);
  const [courseOrder, setCourseOrder] = useState(0);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5050";

  async function loadData() {
    try {
      const [eduRes, certRes, coursesRes] = await Promise.all([
        api.get("/educations"),
        api.get("/certifications"),
        api.get("/courses"),
      ]);
      setEducations(eduRes.data.data || []);
      setCertifications(certRes.data.data || []);
      setCourses(coursesRes.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // Education Handlers
  function handleEditEdu(edu: EducationItem) {
    setEduId(edu._id);
    setDegree(edu.degree);
    setSchool(edu.school);
    setEduPeriod(edu.period);
    setEduLocation(edu.location);
    setEduOrder(edu.order || 0);
    setShowEduForm(true);
  }

  function handleCancelEdu() {
    setEduId(null);
    setDegree("");
    setSchool("");
    setEduPeriod("");
    setEduLocation("");
    setEduOrder(0);
    setShowEduForm(false);
  }

  async function handleSubmitEdu(e: React.FormEvent) {
    e.preventDefault();
    if (!degree || !school || !eduPeriod || !eduLocation) {
      toast.error("Please fill in all education fields.");
      return;
    }

    try {
      if (eduId) {
        await api.patch(`/educations/${eduId}`, {
          degree,
          school,
          period: eduPeriod,
          location: eduLocation,
          order: eduOrder,
        });
        toast.success("Education updated successfully!");
      } else {
        await api.post("/educations", {
          degree,
          school,
          period: eduPeriod,
          location: eduLocation,
          order: eduOrder,
        });
        toast.success("Education item created successfully!");
      }
      handleCancelEdu();
      await loadData();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save education.");
    }
  }

  async function handleDeleteEdu(id: string) {
    if (!confirm("Delete this academic item?")) return;
    try {
      await api.delete(`/educations/${id}`);
      toast.success("Education deleted successfully!");
      await loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item.");
    }
  }

  // Certification Handlers
  function handleEditCert(cert: CertificationItem) {
    setCertId(cert._id);
    setCertName(cert.name);
    setIssuer(cert.issuer);
    setCertDesc(cert.description || "");
    setCertUrl(cert.url || "");
    setCertOrder(cert.order || 0);
    setCertCoverFile(null);
    setShowCertForm(true);
  }

  function handleCancelCert() {
    setCertId(null);
    setCertName("");
    setIssuer("");
    setCertDesc("");
    setCertUrl("");
    setCertOrder(0);
    setCertCoverFile(null);
    setShowCertForm(false);
  }

  async function handleSubmitCert(e: React.FormEvent) {
    e.preventDefault();
    if (!certName || !issuer) {
      toast.error("Name and Issuer are required.");
      return;
    }

    const payload = new FormData();
    payload.append("name", certName);
    payload.append("issuer", issuer);
    payload.append("description", certDesc);
    payload.append("url", certUrl);
    payload.append("order", String(certOrder));

    if (certCoverFile) {
      payload.append("coverImage", certCoverFile);
    }

    try {
      if (certId) {
        await api.patch(`/certifications/${certId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Certification updated successfully!");
      } else {
        await api.post("/certifications", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Certification created successfully!");
      }
      handleCancelCert();
      await loadData();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save certification.");
    }
  }

  async function handleDeleteCert(id: string) {
    if (!confirm("Delete this certification?")) return;
    try {
      await api.delete(`/certifications/${id}`);
      toast.success("Certification deleted successfully!");
      await loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete certification.");
    }
  }

  // Course Handlers
  function handleEditCourse(course: CourseItem) {
    setCourseId(course._id);
    setCourseName(course.name);
    setCoursePlatform(course.platform);
    setCourseCategory(course.category);
    setCourseDesc(course.description || "");
    setCourseOrder(course.order || 0);
    setCourseLogoFile(null);
    setShowCourseForm(true);
  }

  function handleCancelCourse() {
    setCourseId(null);
    setCourseName("");
    setCoursePlatform("");
    setCourseCategory("");
    setCourseDesc("");
    setCourseOrder(0);
    setCourseLogoFile(null);
    setShowCourseForm(false);
  }

  async function handleSubmitCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!courseName || !coursePlatform || !courseCategory) {
      toast.error("Course name, platform, and category are required.");
      return;
    }

    const payload = new FormData();
    payload.append("name", courseName);
    payload.append("platform", coursePlatform);
    payload.append("category", courseCategory);
    payload.append("description", courseDesc);
    payload.append("order", String(courseOrder));

    if (courseLogoFile) {
      payload.append("logo", courseLogoFile);
    }

    try {
      if (courseId) {
        await api.patch(`/courses/${courseId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Course updated successfully!");
      } else {
        await api.post("/courses", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Course created successfully!");
      }
      handleCancelCourse();
      await loadData();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save course.");
    }
  }

  async function handleDeleteCourse(id: string) {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.delete(`/courses/${id}`);
      toast.success("Course deleted successfully!");
      await loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete course.");
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* -------------------- EDUCATION -------------------- */}
      <div className="space-y-6">
        <AdminPageHeader
          title="Education Background"
          description="Your academic qualifications (degrees, schools, periods)."
          actionLabel={showEduForm ? "Close Form" : "Add Education"}
          onAction={showEduForm ? handleCancelEdu : () => setShowEduForm(true)}
        />

        {showEduForm && (
          <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6">
            <form onSubmit={handleSubmitEdu} className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-display font-semibold text-white">
                  {eduId ? "Edit Education" : "Add Academic Degree"}
                </h3>
                <Button type="button" variant="ghost" size="icon" onClick={handleCancelEdu}>
                  <X className="h-4 w-4 text-zinc-400" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="degree" className="mb-1.5 block text-xs text-zinc-500 font-medium">Degree Title</Label>
                  <Input
                    id="degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="e.g. B.Sc. in Computer Science"
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>

                <div>
                  <Label htmlFor="school" className="mb-1.5 block text-xs text-zinc-500 font-medium">School / University</Label>
                  <Input
                    id="school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>

                <div>
                  <Label htmlFor="eduPeriod" className="mb-1.5 block text-xs text-zinc-500 font-medium">Period / Years</Label>
                  <Input
                    id="eduPeriod"
                    value={eduPeriod}
                    onChange={(e) => setEduPeriod(e.target.value)}
                    placeholder="e.g. 2019 — 2023"
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>

                <div>
                  <Label htmlFor="eduLocation" className="mb-1.5 block text-xs text-zinc-500 font-medium">Location</Label>
                  <Input
                    id="eduLocation"
                    value={eduLocation}
                    onChange={(e) => setEduLocation(e.target.value)}
                    placeholder="e.g. Dhaka, Bangladesh"
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>

                <div>
                  <Label htmlFor="eduOrder" className="mb-1.5 block text-xs text-zinc-500 font-medium">Display Order</Label>
                  <Input
                    id="eduOrder"
                    type="number"
                    value={eduOrder}
                    onChange={(e) => setEduOrder(Number(e.target.value))}
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <Button type="button" variant="outline" onClick={handleCancelEdu} className="border-zinc-700 bg-transparent text-zinc-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-lime-400 text-zinc-950 hover:bg-lime-300 font-semibold">
                  {eduId ? "Save Changes" : "Create Item"}
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="space-y-4">
          {educations.map((edu, index) => (
            <Card
              key={edu._id}
              draggable
              onDragStart={() => handleDragStartEdu(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDropEdu(index)}
              className={`border-zinc-800 bg-zinc-900/40 backdrop-blur-sm overflow-hidden cursor-grab active:cursor-grabbing transition-all duration-200 ${
                draggedEduIndex === index ? "opacity-40 scale-[0.98] border-lime-400" : ""
              }`}
            >
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h4 className="font-display text-lg font-bold text-white">{edu.degree}</h4>
                  <p className="text-sm text-lime-400">{edu.school}</p>
                  <p className="text-xs text-zinc-500 mt-1">{edu.period} · {edu.location}</p>
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => handleEditEdu(edu)} className="border-zinc-700 bg-transparent text-zinc-400 hover:text-white" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handleDeleteEdu(edu._id)} className="border-zinc-700 bg-transparent text-zinc-400 hover:border-red-400/50 hover:text-red-400" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {educations.length === 0 && !showEduForm && (
            <div className="rounded-lg border border-dashed border-zinc-800 p-8 text-center text-zinc-500">
              No academic items recorded.
            </div>
          )}
        </div>
      </div>

      {/* -------------------- CERTIFICATIONS -------------------- */}
      <div className="space-y-6">
        <AdminPageHeader
          title="Certifications & Credentials"
          description="Verified course completions and external certification credentials."
          actionLabel={showCertForm ? "Close Form" : "Add Cert"}
          onAction={showCertForm ? handleCancelCert : () => setShowCertForm(true)}
        />

        {showCertForm && (
          <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6">
            <form onSubmit={handleSubmitCert} className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-display font-semibold text-white">
                  {certId ? "Edit Certification" : "Add Certification"}
                </h3>
                <Button type="button" variant="ghost" size="icon" onClick={handleCancelCert}>
                  <X className="h-4 w-4 text-zinc-400" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="certName" className="mb-1.5 block text-xs text-zinc-500 font-medium">Credential Name</Label>
                  <Input
                    id="certName"
                    value={certName}
                    onChange={(e) => setCertName(e.target.value)}
                    placeholder="e.g. AWS Certified Developer"
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>

                <div>
                  <Label htmlFor="issuer" className="mb-1.5 block text-xs text-zinc-500 font-medium">Issuer / Authority</Label>
                  <Input
                    id="issuer"
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    placeholder="e.g. Amazon Web Services, Udemy"
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>

                <div>
                  <Label htmlFor="certCover" className="mb-1.5 block text-xs text-zinc-500 font-medium">Certificate Cover Image</Label>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="certCover"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-700 bg-transparent px-3 py-2 text-xs text-zinc-300 hover:border-lime-400 hover:text-lime-400 transition-colors"
                    >
                      <Upload className="h-3.5 w-3.5" /> {certCoverFile ? "Change Cover" : "Upload Certificate Cover"}
                    </label>
                    <input
                      id="certCover"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCertCoverFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    {certCoverFile && (
                      <span className="text-xs text-lime-400 font-medium truncate max-w-[180px]">{certCoverFile.name}</span>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="certOrder" className="mb-1.5 block text-xs text-zinc-500 font-medium">Display Order</Label>
                  <Input
                    id="certOrder"
                    type="number"
                    value={certOrder}
                    onChange={(e) => setCertOrder(Number(e.target.value))}
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="certUrl" className="mb-1.5 block text-xs text-zinc-500 font-medium">Credential URL Link</Label>
                  <Input
                    id="certUrl"
                    value={certUrl}
                    onChange={(e) => setCertUrl(e.target.value)}
                    placeholder="https://..."
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="certDesc" className="mb-1.5 block text-xs text-zinc-500 font-medium">Brief Description</Label>
                  <Textarea
                    id="certDesc"
                    rows={3}
                    value={certDesc}
                    onChange={(e) => setCertDesc(e.target.value)}
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <Button type="button" variant="outline" onClick={handleCancelCert} className="border-zinc-700 bg-transparent text-zinc-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-lime-400 text-zinc-950 hover:bg-lime-300 font-semibold">
                  {certId ? "Save Changes" : "Create Credential"}
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => {
            const coverUrl = cert.coverImage
              ? `${serverUrl}/uploads/certifications/${cert.coverImage}`
              : "";

            return (
              <Card
                key={cert._id}
                draggable
                onDragStart={() => handleDragStartCert(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDropCert(index)}
                className={`border-zinc-800 bg-zinc-900/40 backdrop-blur-sm flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing transition-all duration-200 ${
                  draggedCertIndex === index ? "opacity-40 scale-[0.98] border-lime-400" : ""
                }`}
              >
                <div>
                  {coverUrl ? (
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden border-b border-zinc-800 bg-zinc-950">
                      <img
                        src={coverUrl}
                        alt={`${cert.name} cover`}
                        className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-44 sm:h-48 w-full items-center justify-center border-b border-zinc-800 bg-zinc-950/60 text-xs text-zinc-600">
                      No cover image uploaded
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-display text-base font-bold text-white">{cert.name}</h4>
                        <p className="text-xs text-lime-400 mt-1">{cert.issuer}</p>
                      </div>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-500 hover:text-lime-400 transition-colors flex-shrink-0 p-1"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    {cert.description && (
                      <p className="text-xs text-zinc-400 mt-3 leading-relaxed">{cert.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 p-5 pt-0 justify-end border-t border-zinc-900/60 mt-3">
                  <Button type="button" variant="outline" onClick={() => handleEditCert(cert)} className="border-zinc-700 bg-transparent text-zinc-400 hover:text-white" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handleDeleteCert(cert._id)} className="border-zinc-700 bg-transparent text-zinc-400 hover:border-red-400/50 hover:text-red-400" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            );
          })}

          {certifications.length === 0 && !showCertForm && (
            <div className="sm:col-span-2 lg:col-span-3 rounded-lg border border-dashed border-zinc-800 p-8 text-center text-zinc-500">
              No certifications recorded.
            </div>
          )}
        </div>
      </div>

      {/* -------------------- COURSES & TRAINING -------------------- */}
      <div className="space-y-6">
        <AdminPageHeader
          title="Courses & Training"
          description="Manage continuous learning, interactive paths, and course completions."
          actionLabel={showCourseForm ? "Close Form" : "Add Course"}
          onAction={showCourseForm ? handleCancelCourse : () => setShowCourseForm(true)}
        />

        {showCourseForm && (
          <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6">
            <form onSubmit={handleSubmitCourse} className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-display font-semibold text-white">
                  {courseId ? "Edit Course" : "Add Course"}
                </h3>
                <Button type="button" variant="ghost" size="icon" onClick={handleCancelCourse}>
                  <X className="h-4 w-4 text-zinc-400" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="courseName" className="mb-1.5 block text-xs text-zinc-500 font-medium">Course Name</Label>
                  <Input
                    id="courseName"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g. Reactive Accelerator"
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>

                <div>
                  <Label htmlFor="coursePlatform" className="mb-1.5 block text-xs text-zinc-500 font-medium">Platform / Provider</Label>
                  <Input
                    id="coursePlatform"
                    value={coursePlatform}
                    onChange={(e) => setCoursePlatform(e.target.value)}
                    placeholder="e.g. Learn with Sumit"
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>

                <div>
                  <Label htmlFor="courseCategory" className="mb-1.5 block text-xs text-zinc-500 font-medium">Category</Label>
                  <Input
                    id="courseCategory"
                    value={courseCategory}
                    onChange={(e) => setCourseCategory(e.target.value)}
                    placeholder="e.g. Frontend Development"
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>

                <div>
                  <Label htmlFor="courseLogo" className="mb-1.5 block text-xs text-zinc-500 font-medium">Platform Logo</Label>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="courseLogo"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-700 bg-transparent px-3 py-1.5 text-xs text-zinc-300 hover:border-lime-400 hover:text-lime-400"
                    >
                      <Upload className="h-3.5 w-3.5" /> {courseLogoFile ? "Change Logo" : "Upload Logo"}
                    </label>
                    <input
                      id="courseLogo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCourseLogoFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    {courseLogoFile && (
                      <span className="text-xs text-lime-400 font-medium">{courseLogoFile.name}</span>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="courseDesc" className="mb-1.5 block text-xs text-zinc-500 font-medium">Course Description</Label>
                  <Textarea
                    id="courseDesc"
                    rows={3}
                    value={courseDesc}
                    onChange={(e) => setCourseDesc(e.target.value)}
                    className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <Button type="button" variant="outline" onClick={handleCancelCourse} className="border-zinc-700 bg-transparent text-zinc-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-lime-400 text-zinc-950 hover:bg-lime-300 font-semibold">
                  {courseId ? "Save Changes" : "Create Course"}
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {courses.map((course, index) => {
            const logoUrl = course.logo
              ? `${serverUrl}/uploads/courses/${course.logo}`
              : "";

            return (
              <Card
                key={course._id}
                draggable
                onDragStart={() => handleDragStartCourse(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDropCourse(index)}
                className={`border-zinc-800 bg-zinc-900/40 backdrop-blur-sm flex flex-col justify-between cursor-grab active:cursor-grabbing transition-all duration-200 ${
                  draggedCourseIndex === index ? "opacity-40 scale-[0.98] border-lime-400" : ""
                }`}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 flex-shrink-0">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={`${course.platform} logo`}
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <span className="text-[9px] text-zinc-600 font-bold">Logo</span>
                      )}
                    </div>
                    <span className="rounded-full border border-lime-400/20 bg-lime-400/5 px-2.5 py-1 text-[10px] font-medium text-lime-400 truncate">
                      {course.category}
                    </span>
                  </div>

                  <h4 className="font-display text-base font-bold text-white">{course.name}</h4>
                  <p className="text-xs text-lime-400 mt-1">{course.platform}</p>

                  {course.description && (
                    <p className="text-xs text-zinc-400 mt-3 leading-relaxed">{course.description}</p>
                  )}
                </div>

                <div className="flex gap-2 p-5 pt-0 justify-end border-t border-zinc-900/60 mt-3">
                  <Button type="button" variant="outline" onClick={() => handleEditCourse(course)} className="border-zinc-700 bg-transparent text-zinc-400 hover:text-white" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handleDeleteCourse(course._id)} className="border-zinc-700 bg-transparent text-zinc-400 hover:border-red-400/50 hover:text-red-400" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            );
          })}

          {courses.length === 0 && !showCourseForm && (
            <div className="sm:col-span-2 rounded-lg border border-dashed border-zinc-800 p-8 text-center text-zinc-500">
              No courses recorded.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
