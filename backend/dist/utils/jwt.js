import jwt from "jsonwebtoken";
const ACCESS_EXPIRE = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRES_IN || "7d";
// =======================
// Generate Access Token
// =======================
export const generateAccessToken = (admin) => {
    return jwt.sign({
        id: admin._id.toString(),
        email: admin.email,
        role: "admin",
    }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: ACCESS_EXPIRE,
    });
};
// =======================
// Generate Refresh Token
// =======================
export const generateRefreshToken = (admin) => {
    return jwt.sign({
        id: admin._id.toString(),
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: REFRESH_EXPIRE,
    });
};
