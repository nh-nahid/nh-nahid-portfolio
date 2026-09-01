import { Request, Response, NextFunction } from "express";
import Certification from "../models/Certification.js";
import { deleteUploadFile } from "../utils/file.js";

// =======================
// GET ALL CERTIFICATIONS
// =======================
export const getCertifications = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const certifications = await Certification.find().sort({
      order: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Certifications fetched successfully",
      count: certifications.length,
      data: certifications,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// CREATE CERTIFICATION
// =======================
export const createCertification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, issuer, description, url, order } = req.body;

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
      order: order !== undefined ? Number(order) : 0,
      coverImage: req.file?.filename || "",
    });

    return res.status(201).json({
      success: true,
      message: "Certification created successfully",
      data: certification,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// UPDATE CERTIFICATION
// =======================
export const updateCertification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const certification = await Certification.findById(req.params.id);

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    const { name, issuer, description, url, order } = req.body;

    // Delete and replace cover image if uploaded
    if (req.file) {
      if (certification.coverImage) {
        deleteUploadFile("certifications/" + certification.coverImage);
      }
      certification.coverImage = req.file.filename;
    }

    certification.name = name ?? certification.name;
    certification.issuer = issuer ?? certification.issuer;
    certification.description = description ?? certification.description;
    certification.url = url ?? certification.url;

    if (order !== undefined) {
      certification.order = Number(order);
    }

    await certification.save();

    return res.status(200).json({
      success: true,
      message: "Certification updated successfully",
      data: certification,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// DELETE CERTIFICATION
// =======================
export const deleteCertification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const certification = await Certification.findById(req.params.id);

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    if (certification.coverImage) {
      deleteUploadFile("certifications/" + certification.coverImage);
    }

    await certification.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Certification deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
