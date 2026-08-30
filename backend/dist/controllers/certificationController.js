import Certification from "../models/Certification.js";
// =======================
// GET ALL CERTIFICATIONS
// =======================
export const getCertifications = async (_req, res, next) => {
    try {
        const certifications = await Certification.find().sort({ createdAt: 1 });
        return res.status(200).json({
            success: true,
            message: "Certifications fetched successfully",
            count: certifications.length,
            data: certifications,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// CREATE CERTIFICATION
// =======================
export const createCertification = async (req, res, next) => {
    try {
        const { name, issuer, description, url } = req.body;
        if (!name || !issuer) {
            return res.status(400).json({
                success: false,
                message: "Certification name and issuer are required.",
            });
        }
        const certification = await Certification.create({
            name,
            issuer,
            description: description ?? "",
            url: url ?? "",
        });
        return res.status(201).json({
            success: true,
            message: "Certification created successfully",
            data: certification,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// UPDATE CERTIFICATION
// =======================
export const updateCertification = async (req, res, next) => {
    try {
        const { name, issuer, description, url } = req.body;
        const certification = await Certification.findById(req.params.id);
        if (!certification) {
            return res.status(404).json({
                success: false,
                message: "Certification not found",
            });
        }
        certification.name = name ?? certification.name;
        certification.issuer = issuer ?? certification.issuer;
        certification.description = description ?? certification.description;
        certification.url = url ?? certification.url;
        await certification.save();
        return res.status(200).json({
            success: true,
            message: "Certification updated successfully",
            data: certification,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// DELETE CERTIFICATION
// =======================
export const deleteCertification = async (req, res, next) => {
    try {
        const certification = await Certification.findByIdAndDelete(req.params.id);
        if (!certification) {
            return res.status(404).json({
                success: false,
                message: "Certification not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Certification deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
