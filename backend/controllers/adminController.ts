import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";

import setRefreshCookie from "../utils/setRefreshCookie.js";

import { env } from "../config/env.js";


// Login 
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      email,
      password,
    } = req.body;


    // Find admin
    const admin = await Admin
      .findOne({ email })
      .select("+password +refreshToken");


    if (!admin) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });

    }



    // Compare password

    const isPasswordMatched = await bcrypt.compare(
      password,
      admin.password
    );


    if (!isPasswordMatched) {

      return res.status(401).json({
        success:false,
        message:"Invalid email or password",
      });

    }



    // Generate tokens

    const accessToken = generateAccessToken(admin);

    const refreshToken = generateRefreshToken(admin);



    // Store refresh token

    admin.refreshToken = refreshToken;

    await admin.save();



    // Set cookie

    setRefreshCookie(
      res,
      refreshToken
    );



    return res.status(200).json({

      success:true,

      message:"Login successful",


      accessToken,


      admin:{
        id: admin._id,
        name: admin.name,
        email: admin.email,
        avatar: admin.avatar,
        phone: admin.phone,
        bio: admin.bio,
      }

    });


  } catch(error){

    next(error);

  }

};

// Logout
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const refreshToken = req.cookies.refreshToken;


    if (refreshToken) {

      const admin = await Admin.findOne({
        refreshToken,
      }).select("+refreshToken");


      if (admin) {

        admin.refreshToken = null;

        await admin.save();

      }

    }



    res.clearCookie(
      "refreshToken",
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV === "production",

        sameSite:
          process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
      }
    );



    return res.status(200).json({

      success:true,

      message:"Logout successful",

    });


  } catch(error){

    next(error);

  }

};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const refreshToken = req.cookies.refreshToken;


    if (!refreshToken) {

      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });

    }



    let decoded: {
      id: string;
    };


    try {

      decoded = jwt.verify(
        refreshToken,
        env.JWT_REFRESH_SECRET
      ) as {
        id: string;
      };


    } catch (error) {

      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });

    }



    const admin = await Admin
      .findById(decoded.id)
      .select("+refreshToken");


    if (!admin) {

      return res.status(401).json({
        success:false,
        message:"Admin not found",
      });

    }



    // Check stored refresh token

    if (admin.refreshToken !== refreshToken) {

      return res.status(401).json({
        success:false,
        message:"Invalid refresh token",
      });

    }



    // Generate new tokens

    const newAccessToken =
      generateAccessToken(admin);


    const newRefreshToken =
      generateRefreshToken(admin);



    // Rotate refresh token

    admin.refreshToken = newRefreshToken;

    await admin.save();



    // Update cookie

    setRefreshCookie(
      res,
      newRefreshToken
    );



    return res.status(200).json({

      success:true,

      accessToken:newAccessToken,

    });


  } catch(error){

    next(error);

  }

};


export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const admin = await Admin.findById(
      req.user?.id
    )
    .select("-password -refreshToken");


    if (!admin) {

      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });

    }



    return res.status(200).json({

      success: true,

      data: admin,

    });


  } catch(error) {

    next(error);

  }

};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;



    // Find admin
    const admin = await Admin
      .findById(req.user?.id)
      .select("+password");


    if (!admin) {

      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });

    }



    // Check current password

    const isPasswordMatched =
      await bcrypt.compare(
        currentPassword,
        admin.password
      );


    if (!isPasswordMatched) {

      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });

    }



    // Hash new password

    admin.password =
      await bcrypt.hash(
        newPassword,
        10
      );


    await admin.save();



    return res.status(200).json({

      success: true,

      message: "Password changed successfully",

    });


  } catch(error) {

    next(error);

  }

};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { email } = req.body;



    const admin = await Admin.findOne({
      email,
    });



    if (!admin) {

      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });

    }



    // Create reset token

    const resetToken = jwt.sign(
      {
        id: admin._id,
      },
      env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      }
    );



    const resetLink =
      `${env.CLIENT_URL}/reset-password/${resetToken}`;



    // TODO:
    // Send email using nodemailer
    // For now return link for testing


    return res.status(200).json({

      success: true,

      message:
        "Password reset link generated successfully",

      resetLink,

    });



  } catch(error){

    next(error);

  }

};


export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      token,
      password,
    } = req.body;



    if (!token || !password) {

      return res.status(400).json({
        success: false,
        message: "Token and password are required",
      });

    }



    // Verify reset token

    let decoded: {
      id: string;
    };


    try {

      decoded = jwt.verify(
        token,
        env.JWT_ACCESS_SECRET
      ) as {
        id: string;
      };


    } catch(error) {

      return res.status(400).json({
        success:false,
        message:"Invalid or expired reset token",
      });

    }



    // Find admin

    const admin = await Admin.findById(
      decoded.id
    ).select("+password");



    if (!admin) {

      return res.status(404).json({
        success:false,
        message:"Admin not found",
      });

    }



    // Update password

    admin.password =
      await bcrypt.hash(
        password,
        10
      );


    // Invalidate old sessions

    admin.refreshToken = null;


    await admin.save();



    return res.status(200).json({

      success:true,

      message:"Password reset successfully",

    });



  } catch(error) {

    next(error);

  }

};