import Course from "../models/Course.js";
import { deleteUploadFile } from "../utils/file.js";
// =======================
// GET ALL COURSES
// =======================
export const getCourses = async (_req, res, next) => {
    try {
        const courses = await Course.find().sort({
            order: 1,
            createdAt: -1,
        });
        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            count: courses.length,
            data: courses,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// CREATE COURSE
// =======================
export const createCourse = async (req, res, next) => {
    try {
        const { name, platform, category, description, order } = req.body;
        if (!name || !platform || !category) {
            return res.status(400).json({
                success: false,
                message: "Name, platform and category are required.",
            });
        }
        const course = await Course.create({
            name,
            platform,
            category,
            description: description || "",
            order: order ?? 0,
            logo: req.file?.filename || "",
        });
        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// UPDATE COURSE
// =======================
export const updateCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        const { name, platform, category, description, order } = req.body;
        // Delete and replace logo image
        if (req.file) {
            if (course.logo) {
                deleteUploadFile("courses/" + course.logo);
            }
            course.logo = req.file.filename;
        }
        course.name = name ?? course.name;
        course.platform = platform ?? course.platform;
        course.category = category ?? course.category;
        course.description = description ?? course.description;
        if (order !== undefined) {
            course.order = Number(order);
        }
        await course.save();
        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: course,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// DELETE COURSE
// =======================
export const deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        if (course.logo) {
            deleteUploadFile("courses/" + course.logo);
        }
        await course.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
