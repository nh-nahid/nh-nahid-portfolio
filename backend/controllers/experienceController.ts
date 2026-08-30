import { Request, Response, NextFunction } from "express";
import Experience from "../models/Experience.js";
import { deleteUploadFile } from "../utils/file.js";

// Helper to format date into "MMM YYYY" (e.g. "Oct 2023")
function formatPeriodDate(dateVal: any): string {
  if (!dateVal) return "";
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Helper to generate period string
function makePeriod(startDate: string, endDate: string | null, currentlyWorking: boolean): string {
  const startStr = formatPeriodDate(startDate);
  if (currentlyWorking) {
    return `${startStr} — Present`;
  }
  const endStr = formatPeriodDate(endDate);
  return `${startStr} — ${endStr}`;
}

// =======================
// GET ALL EXPERIENCES
// =======================
export const getExperiences = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const experiences = await Experience.find().sort({
      order: 1,
      startDate: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Experiences fetched successfully",
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// CREATE EXPERIENCE
// =======================
export const createExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      company,
      role,
      employmentType,
      location,
      startDate,
      endDate,
      currentlyWorking,
      points,
      technologies,
      order,
    } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        success: false,
        message: "Company and role (position) are required.",
      });
    }

    // Generate period string
    const period = makePeriod(startDate, endDate, currentlyWorking === "true" || currentlyWorking === true);

    const experience = await Experience.create({
      company,
      role,
      employmentType,
      location,
      period,
      points: points
        ? Array.isArray(points)
          ? points
          : [points]
        : [],
      technologies: technologies
        ? Array.isArray(technologies)
          ? technologies
          : [technologies]
        : [],
      currentlyWorking: currentlyWorking === "true" || currentlyWorking === true,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      order: order ?? 0,
      companyLogo: req.file?.filename || "",
    });

    return res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// UPDATE EXPERIENCE
// =======================
export const updateExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    const {
      company,
      role,
      employmentType,
      location,
      startDate,
      endDate,
      currentlyWorking,
      points,
      technologies,
      order,
    } = req.body;

    // Replace logo
    if (req.file) {
      if (experience.companyLogo) {
        deleteUploadFile("company-logos/" + experience.companyLogo);
      }
      experience.companyLogo = req.file.filename;
    }

    experience.company = company ?? experience.company;
    experience.role = role ?? experience.role;
    experience.employmentType = employmentType ?? experience.employmentType;
    experience.location = location ?? experience.location;

    if (currentlyWorking !== undefined) {
      experience.currentlyWorking = currentlyWorking === "true" || currentlyWorking === true;
    }
    if (startDate !== undefined) {
      experience.startDate = startDate ? new Date(startDate) : undefined;
    }
    if (endDate !== undefined) {
      experience.endDate = endDate ? new Date(endDate) : undefined;
    }

    // Re-generate period string if dates/currently working status changed
    const targetStartDate = startDate || experience.startDate;
    const targetEndDate = endDate || experience.endDate;
    const targetCurrentlyWorking = currentlyWorking !== undefined ? (currentlyWorking === "true" || currentlyWorking === true) : experience.currentlyWorking;
    if (targetStartDate) {
      experience.period = makePeriod(String(targetStartDate), targetEndDate ? String(targetEndDate) : null, targetCurrentlyWorking);
    }

    if (points !== undefined) {
      experience.points = Array.isArray(points) ? points : [points];
    }
    if (technologies !== undefined) {
      experience.technologies = Array.isArray(technologies) ? technologies : [technologies];
    }
    if (order !== undefined) {
      experience.order = order;
    }

    await experience.save();

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// DELETE EXPERIENCE
// =======================
export const deleteExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    // Delete logo file
    if (experience.companyLogo) {
      deleteUploadFile("company-logos/" + experience.companyLogo);
    }

    await experience.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
