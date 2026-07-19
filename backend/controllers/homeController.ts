import { Request, Response, NextFunction } from "express";

import Home from "../models/Home.js";
import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";
import Project from "../models/Project.js";
import Education from "../models/Education.js";
import Certification from "../models/Certification.js";

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
      },
    });
  } catch (error) {
    next(error);
  }
};