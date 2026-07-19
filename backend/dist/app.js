import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import adminRouter from "./routers/adminRouter.js";
import profileRouter from "./routers/profileRouter.js";
import skillRouter from "./routers/skillRouter.js";
import experienceRouter from "./routers/experienceRouter.js";
import projectRouter from "./routers/projectRouter.js";
import contactRouter from "./routers/contactRouter.js";
import homeRouter from "./routers/homeRouter.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/skills", skillRouter);
app.use("/api/v1/experiences", experienceRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/home", homeRouter);
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});
app.use(errorMiddleware);
export default app;
