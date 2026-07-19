import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import adminRouter from "./routers/adminRouter.js";
import skillRouter from "./routers/skillRouter.js";
import experienceRouter from "./routers/experienceRouter.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));


app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/profile", adminRouter);
app.use("/api/v1/skills", skillRouter);
app.use("/api/v1/experiences", experienceRouter);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

app.use(errorMiddleware);

export default app;