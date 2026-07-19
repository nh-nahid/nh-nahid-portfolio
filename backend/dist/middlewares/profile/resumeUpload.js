import multer from "multer";
import fs from "fs";
import path from "path";
// Upload directory
const uploadPath = path.join(process.cwd(), "public", "uploads", "resumes");
// Create directory if it doesn't exist
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, {
        recursive: true,
    });
}
// Storage
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
        const uniqueName = Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);
        cb(null, uniqueName);
    },
});
// PDF filter
const fileFilter = (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    }
    else {
        cb(new Error("Only PDF files are allowed."));
    }
};
// Upload middleware
export const resumeUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
}).single("resume");
