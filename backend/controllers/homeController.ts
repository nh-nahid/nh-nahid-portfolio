import { Request, Response, NextFunction } from "express";

import Home from "../models/Home.js";
import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";
import Project from "../models/Project.js";
import Education from "../models/Education.js";
import Certification from "../models/Certification.js";
import Course from "../models/Course.js";

export const getHome = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [
      home,
      profile,
      skills,
      experiences,
      featuredProjects,
      education,
      certifications,
      courses,
    ] = await Promise.all([
      Home.findOne(),

      Profile.findOne(),

      Skill.find().sort({
        order: 1,
      }),

      Experience.find().sort({
        order: 1,
      }),

      Project.find({
        featured: true,
      }).sort({
        order: 1,
      }),

      Education.find().sort({
        order: 1,
      }),

      Certification.find().sort({
        order: 1,
      }),

      Course.find().sort({
        order: 1,
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Home data fetched successfully",

      data: {
        profile,

        stats: home?.stats ?? [],

        skills,

        experiences,

        featuredProjects,

        education,

        certifications,

        courses,
      },
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// UPDATE HOME STATS
// =======================
export const updateHomeStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { stats } = req.body; // array of { value, label }

    let home = await Home.findOne();

    if (!home) {
      home = await Home.create({ stats });
    } else {
      home.stats = stats;
      await home.save();
    }

    return res.status(200).json({
      success: true,
      message: "Home stats updated successfully",
      data: home.stats,
    });
  } catch (error) {
    next(error);
  }
};