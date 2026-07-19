import { Request, Response, NextFunction } from "express";

import Skill from "../models/Skill.js";

// =======================
// GET ALL SKILLS
// =======================
export const getSkills = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skills = await Skill.find().sort({
      order: 1,
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      message: "Skills fetched successfully",
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    next(error);
  }
};


// =======================
// CREATE SKILL
// =======================
export const createSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      category,
      icon,
      level,
      order,
    } = req.body;

    // Check existing skill
    const existingSkill = await Skill.findOne({
      name,
    });

    if (existingSkill) {
      return res.status(409).json({
        success: false,
        message: "Skill already exists",
      });
    }

    // Create skill
    const skill = await Skill.create({
      name,
      category,
      icon,
      level,
      order,
    });

    return res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};


// =======================
// UPDATE SKILL
// =======================
export const updateSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      category,
      icon,
      level,
      order,
    } = req.body;

    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    // Prevent duplicate skill names
    if (name) {
      const existingSkill = await Skill.findOne({
        name: {
          $regex: new RegExp(`^${name}$`, "i"),
        },
        _id: {
          $ne: skill._id,
        },
      });

      if (existingSkill) {
        return res.status(409).json({
          success: false,
          message: "Skill already exists",
        });
      }
    }

    skill.name = name ?? skill.name;
    skill.category = category ?? skill.category;
    skill.icon = icon ?? skill.icon;
    skill.level = level ?? skill.level;
    skill.order = order ?? skill.order;

    await skill.save();

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};


// =======================
// DELETE SKILL
// =======================
export const deleteSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    await skill.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};