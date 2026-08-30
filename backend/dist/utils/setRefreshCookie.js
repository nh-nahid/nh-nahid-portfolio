import { env } from "../config/env.js";
const setRefreshCookie = (res, refreshToken) => {
    const isProd = Boolean(process.env.NODE_ENV === "production" ||
        (env.MONGODB_URI && !env.MONGODB_URI.includes("localhost") && !env.MONGODB_URI.includes("127.0.0.1")));
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};
export default setRefreshCookie;
