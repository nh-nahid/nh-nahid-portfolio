import fs from "fs";
import path from "path";
import Profile from "../models/Profile.js";
import { deleteUploadFile } from "../utils/file.js";
// =======================
// GET PROFILE
// =======================
export const getProfile = async (_req, res, next) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: profile,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// UPDATE PROFILE
// =======================
export const updateProfile = async (req, res, next) => {
    try {
        const { name, title, subtitle, bio, about, email, phone, location, github, linkedin, facebook, instagram, twitter, website, } = req.body;
        const profile = await Profile.findOne();
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        profile.name = name ?? profile.name;
        profile.title = title ?? profile.title;
        profile.subtitle = subtitle ?? profile.subtitle;
        profile.bio = bio ?? profile.bio;
        profile.about = about ?? profile.about;
        profile.email = email ?? profile.email;
        profile.phone = phone ?? profile.phone;
        profile.location = location ?? profile.location;
        profile.github = github ?? profile.github;
        profile.linkedin = linkedin ?? profile.linkedin;
        profile.facebook = facebook ?? profile.facebook;
        profile.instagram = instagram ?? profile.instagram;
        profile.twitter = twitter ?? profile.twitter;
        profile.website = website ?? profile.website;
        await profile.save();
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: profile,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// UPDATE AVATAR
// =======================
export const updateAvatar = async (req, res, next) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Avatar image is required",
            });
        }
        // Delete old avatar
        if (profile.avatar) {
            deleteUploadFile(profile.avatar);
        }
        // Save new avatar filename with directory prefix
        profile.avatar = "avatars/" + req.file.filename;
        await profile.save();
        return res.status(200).json({
            success: true,
            message: "Avatar updated successfully",
            avatar: profile.avatar,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// DELETE AVATAR
// =======================
export const deleteAvatar = async (_req, res, next) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        if (!profile.avatar) {
            return res.status(400).json({
                success: false,
                message: "No avatar found",
            });
        }
        deleteUploadFile(profile.avatar);
        profile.avatar = "";
        await profile.save();
        return res.status(200).json({
            success: true,
            message: "Avatar deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// UPDATE RESUME
// =======================
export const updateResume = async (req, res, next) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume PDF is required",
            });
        }
        // Delete old resume
        if (profile.resume) {
            deleteUploadFile(profile.resume);
        }
        // Save new resume filename with directory prefix
        profile.resume = "resumes/" + req.file.filename;
        await profile.save();
        return res.status(200).json({
            success: true,
            message: "Resume updated successfully",
            resume: profile.resume,
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// DELETE RESUME
// =======================
export const deleteResume = async (_req, res, next) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        if (!profile.resume) {
            return res.status(400).json({
                success: false,
                message: "No resume found",
            });
        }
        deleteUploadFile(profile.resume);
        profile.resume = "";
        await profile.save();
        return res.status(200).json({
            success: true,
            message: "Resume deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
// =======================
// DOWNLOAD RESUME
// =======================
export const downloadResume = async (_req, res, next) => {
    try {
        const profile = await Profile.findOne();
        if (!profile || !profile.resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }
        const resumePath = path.join(process.cwd(), "public", "uploads", profile.resume);
        if (!fs.existsSync(resumePath)) {
            return res.status(404).json({
                success: false,
                message: "Resume file not found",
            });
        }
        return res.download(resumePath, "Nahid-Hossain-Resume.pdf");
    }
    catch (error) {
        next(error);
    }
};
