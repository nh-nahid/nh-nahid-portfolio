import Education from "../models/Education.js";
// =======================
// GET ALL EDUCATION ITEMS
// =======================
export const getEducations = async (_req, res, next) => {
    try {
        const educations = await Education.find().sort({ order: 1, createdAt: 1 });
        return res.status(200).json({
            success: true,
            message: "Educations fetched successfully",
            count: educations.length,
            data: educations,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// CREATE EDUCATION ITEM
// =======================
export const createEducation = async (req, res, next) => {
    try {
        const { degree, school, period, location, order } = req.body;
        if (!degree || !school || !period || !location) {
            return res.status(400).json({
                success: false,
                message: "Degree, school, period and location are required.",
            });
        }
        const education = await Education.create({
            degree,
            school,
            period,
            location,
            order: order ?? 0,
        });
        return res.status(201).json({
            success: true,
            message: "Education item created successfully",
            data: education,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// UPDATE EDUCATION ITEM
// =======================
export const updateEducation = async (req, res, next) => {
    try {
        const { degree, school, period, location, order } = req.body;
        const education = await Education.findById(req.params.id);
        if (!education) {
            return res.status(404).json({
                success: false,
                message: "Education item not found",
            });
        }
        education.degree = degree ?? education.degree;
        education.school = school ?? education.school;
        education.period = period ?? education.period;
        education.location = location ?? education.location;
        if (order !== undefined) {
            education.order = order;
        }
        await education.save();
        return res.status(200).json({
            success: true,
            message: "Education item updated successfully",
            data: education,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// DELETE EDUCATION ITEM
// =======================
export const deleteEducation = async (req, res, next) => {
    try {
        const education = await Education.findByIdAndDelete(req.params.id);
        if (!education) {
            return res.status(404).json({
                success: false,
                message: "Education item not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Education item deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
