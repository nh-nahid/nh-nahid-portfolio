import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import Project from "../models/Project.js";

// =======================
// GET ALL PROJECTS
// =======================
export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const featured = req.query.featured;

    const filter =
      featured === "true"
        ? { featured: true }
        : {};

    const projects = await Project.find(filter).sort({
      order: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// GET SINGLE PROJECT
// =======================
export const getProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;

    const project = await Project.findOne({
      slug,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// CREATE PROJECT
// =======================
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      slug,
      description,
      category,
      technologies,
      githubUrl,
      liveUrl,
      figmaUrl,
      featured,
      order,
    } = req.body;

    // Check existing slug
    const existingProject = await Project.findOne({
      slug: slug.toLowerCase(),
    });

    if (existingProject) {
      return res.status(409).json({
        success: false,
        message: "Project already exists",
      });
    }

    const project = await Project.create({
      title,
      slug: slug.toLowerCase(),
      description,
      category,

      technologies: technologies
        ? Array.isArray(technologies)
          ? technologies
          : [technologies]
        : [],

      githubUrl,
      liveUrl,
      figmaUrl,

      featured:
        featured === true ||
        featured === "true",

      order,

      image: req.file?.filename || "",
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};



// =======================
// UPDATE PROJECT
// =======================
export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const {
      title,
      slug,
      description,
      category,
      technologies,
      githubUrl,
      liveUrl,
      figmaUrl,
      featured,
      order,
    } = req.body;

    // Prevent duplicate slug
    if (slug) {
      const existingProject = await Project.findOne({
        slug: slug.toLowerCase(),
        _id: {
          $ne: project._id,
        },
      });

      if (existingProject) {
        return res.status(409).json({
          success: false,
          message: "Project already exists",
        });
      }
    }

    // Replace image
    if (req.file) {
      if (project.image) {
        const oldImagePath = path.join(
          process.cwd(),
          "public",
          "uploads",
          "projects",
          project.image
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      project.image = req.file.filename;
    }

    project.title = title ?? project.title;
    project.slug = slug
      ? slug.toLowerCase()
      : project.slug;

    project.description =
      description ?? project.description;

    project.category =
      category ?? project.category;

    if (technologies !== undefined) {
      project.technologies = Array.isArray(
        technologies
      )
        ? technologies
        : [technologies];
    }

    project.githubUrl =
      githubUrl ?? project.githubUrl;

    project.liveUrl =
      liveUrl ?? project.liveUrl;

    project.figmaUrl =
      figmaUrl ?? project.figmaUrl;

    if (featured !== undefined) {
      project.featured =
        featured === true ||
        featured === "true";
    }

    project.order = order ?? project.order;

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};



// =======================
// DELETE PROJECT
// =======================
export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Delete project image
    if (project.image) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        "projects",
        project.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await project.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};