import Project from "../models/Project.js";
import { deleteUploadFile } from "../utils/file.js";
// =======================
// GET ALL PROJECTS
// =======================
export const getProjects = async (req, res, next) => {
    try {
        const featured = req.query.featured;
        const filter = featured === "true"
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
    }
    catch (error) {
        next(error);
    }
};
// =======================
// GET SINGLE PROJECT
// =======================
export const getProject = async (req, res, next) => {
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
    }
    catch (error) {
        next(error);
    }
};
// =======================
// CREATE PROJECT
// =======================
export const createProject = async (req, res, next) => {
    try {
        const { name, slug, desc, tag, points, category, stack, github, url, figmaUrl, featured, order, } = req.body;
        if (!name || !slug || !desc) {
            return res.status(400).json({
                success: false,
                message: "Name, slug and desc (description) are required.",
            });
        }
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
            name,
            slug: slug.toLowerCase(),
            desc,
            tag: tag || "",
            points: points
                ? Array.isArray(points)
                    ? points
                    : [points]
                : [],
            category,
            stack: stack
                ? Array.isArray(stack)
                    ? stack
                    : [stack]
                : [],
            github,
            url,
            figmaUrl,
            featured: featured === true ||
                featured === "true",
            order: order ?? 0,
            coverImage: req.file?.filename || "",
        });
        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// UPDATE PROJECT
// =======================
export const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        const { name, slug, desc, tag, points, category, stack, github, url, figmaUrl, featured, order, } = req.body;
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
        // Replace coverImage
        if (req.file) {
            const oldImage = project.coverImage || project.image;
            if (oldImage) {
                deleteUploadFile("projects/" + oldImage);
            }
            project.coverImage = req.file.filename;
            // Unset old legacy image attribute if it existed
            if (project.get("image")) {
                project.set("image", undefined);
            }
        }
        project.name = name ?? project.name;
        project.slug = slug
            ? slug.toLowerCase()
            : project.slug;
        project.desc = desc ?? project.desc;
        project.tag = tag ?? project.tag;
        project.category = category ?? project.category;
        if (points !== undefined) {
            project.points = Array.isArray(points) ? points : [points];
        }
        if (stack !== undefined) {
            project.stack = Array.isArray(stack) ? stack : [stack];
        }
        project.github = github ?? project.github;
        project.url = url ?? project.url;
        project.figmaUrl = figmaUrl ?? project.figmaUrl;
        if (featured !== undefined) {
            project.featured =
                featured === true ||
                    featured === "true";
        }
        if (order !== undefined) {
            project.order = order;
        }
        await project.save();
        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: project,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// DELETE PROJECT
// =======================
export const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        // Delete project image
        const imageToDelete = project.coverImage || project.image;
        if (imageToDelete) {
            deleteUploadFile("projects/" + imageToDelete);
        }
        await project.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
