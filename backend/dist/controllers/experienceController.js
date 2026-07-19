import path from "path";
import fs from "fs";
import Experience from "../models/Experience.js";
// =======================
// GET ALL EXPERIENCES
// =======================
export const getExperiences = async (_req, res, next) => {
    try {
        const experiences = await Experience.find().sort({
            order: 1,
            startDate: -1,
        });
        return res.status(200).json({
            success: true,
            message: "Experiences fetched successfully",
            count: experiences.length,
            data: experiences,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// CREATE EXPERIENCE
// =======================
export const createExperience = async (req, res, next) => {
    try {
        const { company, position, employmentType, location, startDate, endDate, currentlyWorking, description, technologies, order, } = req.body;
        // Prevent duplicate experience
        const existingExperience = await Experience.findOne({
            company: {
                $regex: new RegExp(`^${company}$`, "i"),
            },
            position: {
                $regex: new RegExp(`^${position}$`, "i"),
            },
        });
        if (existingExperience) {
            return res.status(409).json({
                success: false,
                message: "Experience already exists",
            });
        }
        const experience = await Experience.create({
            company,
            position,
            employmentType,
            location,
            startDate,
            endDate: currentlyWorking ? null : endDate,
            currentlyWorking,
            description: description
                ? Array.isArray(description)
                    ? description
                    : [description]
                : [],
            technologies: technologies
                ? Array.isArray(technologies)
                    ? technologies
                    : [technologies]
                : [],
            companyLogo: req.file?.filename || "",
            order,
        });
        return res.status(201).json({
            success: true,
            message: "Experience created successfully",
            data: experience,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// UPDATE EXPERIENCE
// =======================
export const updateExperience = async (req, res, next) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found",
            });
        }
        const { company, position, employmentType, location, startDate, endDate, currentlyWorking, description, technologies, order, } = req.body;
        // Prevent duplicate experience
        if (company || position) {
            const existingExperience = await Experience.findOne({
                company: {
                    $regex: new RegExp(`^${company ?? experience.company}$`, "i"),
                },
                position: {
                    $regex: new RegExp(`^${position ?? experience.position}$`, "i"),
                },
                _id: {
                    $ne: experience._id,
                },
            });
            if (existingExperience) {
                return res.status(409).json({
                    success: false,
                    message: "Experience already exists",
                });
            }
        }
        // Replace company logo
        if (req.file) {
            if (experience.companyLogo) {
                const oldLogoPath = path.join(process.cwd(), "public", "uploads", "company-logos", experience.companyLogo);
                if (fs.existsSync(oldLogoPath)) {
                    fs.unlinkSync(oldLogoPath);
                }
            }
            experience.companyLogo = req.file.filename;
        }
        experience.company = company ?? experience.company;
        experience.position = position ?? experience.position;
        experience.employmentType =
            employmentType ?? experience.employmentType;
        experience.location = location ?? experience.location;
        experience.startDate =
            startDate ?? experience.startDate;
        experience.currentlyWorking =
            currentlyWorking ?? experience.currentlyWorking;
        experience.endDate =
            currentlyWorking === true ||
                currentlyWorking === "true"
                ? null
                : endDate ?? experience.endDate;
        if (description !== undefined) {
            experience.description = Array.isArray(description)
                ? description
                : [description];
        }
        if (technologies !== undefined) {
            experience.technologies = Array.isArray(technologies)
                ? technologies
                : [technologies];
        }
        experience.order = order ?? experience.order;
        await experience.save();
        return res.status(200).json({
            success: true,
            message: "Experience updated successfully",
            data: experience,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// DELETE EXPERIENCE
// =======================
export const deleteExperience = async (req, res, next) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found",
            });
        }
        // Delete company logo
        if (experience.companyLogo) {
            const logoPath = path.join(process.cwd(), "public", "uploads", "company-logos", experience.companyLogo);
            if (fs.existsSync(logoPath)) {
                fs.unlinkSync(logoPath);
            }
        }
        await experience.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Experience deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
