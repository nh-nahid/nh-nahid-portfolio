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
    const skills = await Skill.find();

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
      sectionTitle,
      heading,
      description,
      orbitTools,
      toolbox,
      categories,
    } = req.body;

    const skill = await Skill.create({
      sectionTitle,
      heading,
      description,
      orbitTools: orbitTools || [],
      toolbox: toolbox || [],
      categories: categories || [],
    });

    return res.status(201).json({
      success: true,
      message: "Skills document created successfully",
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
      sectionTitle,
      heading,
      description,
      orbitTools,
      toolbox,
      categories,
    } = req.body;

    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skills document not found",
      });
    }

    skill.sectionTitle = sectionTitle ?? skill.sectionTitle;
    skill.heading = heading ?? skill.heading;
    skill.description = description ?? skill.description;

    if (orbitTools !== undefined) {
      skill.orbitTools = orbitTools;
    }
    if (toolbox !== undefined) {
      skill.toolbox = toolbox;
    }
    if (categories !== undefined) {
      skill.categories = categories;
    }

    await skill.save();

    return res.status(200).json({
      success: true,
      message: "Skills document updated successfully",
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
        message: "Skills document not found",
      });
    }

    await skill.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Skills document deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};