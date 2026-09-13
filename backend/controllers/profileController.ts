import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import Profile from "../models/Profile.js";
import Experience from "../models/Experience.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Course from "../models/Course.js";
import Education from "../models/Education.js";
import Certification from "../models/Certification.js";
import { deleteUploadFile } from "../utils/file.js";

// =======================
// GET PROFILE
// =======================
export const getProfile = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (error) {
    next(error);
  }
};


// =======================
// UPDATE PROFILE
// =======================
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      title,
      subtitle,
      bio,
      about,
      email,
      phone,
      location,
      github,
      linkedin,
      facebook,
      instagram,
      twitter,
      website,
    } = req.body;

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
  } catch (error) {
    next(error);
  }
};


// =======================
// UPDATE AVATAR
// =======================
export const updateAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (error) {
    next(error);
  }
};

// =======================
// DELETE AVATAR
// =======================
export const deleteAvatar = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (error) {
    next(error);
  }
};


// =======================
// UPDATE RESUME
// =======================
export const updateResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (error) {
    next(error);
  }
};

// =======================
// DELETE RESUME
// =======================
export const deleteResume = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (error) {
    next(error);
  }
};



// =======================
// DOWNLOAD RESUME
// =======================
export const downloadResume = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profile = await Profile.findOne();

    if (!profile || !profile.resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }


    const resumePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      profile.resume
    );


    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({
        success: false,
        message: "Resume file not found",
      });
    }


    return res.download(
      resumePath,
      "Nahid-Hossain-Resume.pdf"
    );

  } catch (error) {
    next(error);
  }
};

// =======================
// EXPORT PORTFOLIO JSON
// =======================
export const exportPortfolioJSON = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profile = await Profile.findOne();
    const experiences = await Experience.find().sort({ order: 1, startDate: -1 });
    const projects = await Project.find().sort({ order: 1 });
    const skills = await Skill.findOne();
    const courses = await Course.find().sort({ order: 1 });
    const educations = await Education.find().sort({ order: 1 });
    const certifications = await Certification.find().sort({ order: 1 });

    const exportData = {
      exportedAt: new Date().toISOString(),
      profile: profile || {},
      experiences: experiences || [],
      projects: projects || [],
      skills: skills || {},
      courses: courses || [],
      educations: educations || [],
      certifications: certifications || [],
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", 'attachment; filename="portfolio_data.json"');
    return res.status(200).json(exportData);
  } catch (error) {
    next(error);
  }
};