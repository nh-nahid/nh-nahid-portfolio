import jwt from "jsonwebtoken";
import { IAdmin } from "../models/Admin.js";

const ACCESS_EXPIRE =
  process.env.JWT_ACCESS_EXPIRES_IN || "15m";

const REFRESH_EXPIRE =
  process.env.JWT_REFRESH_EXPIRES_IN || "7d";

// =======================
// Generate Access Token
// =======================
export const generateAccessToken = (
  admin: IAdmin
): string => {
  return jwt.sign(
    {
      id: admin._id.toString(),
      email: admin.email,
      role: "admin",
    },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: ACCESS_EXPIRE as jwt.SignOptions["expiresIn"],
    }
  );
};

// =======================
// Generate Refresh Token
// =======================
export const generateRefreshToken = (
  admin: IAdmin
): string => {
  return jwt.sign(
    {
      id: admin._id.toString(),
    },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: REFRESH_EXPIRE as jwt.SignOptions["expiresIn"],
    }
  );
};