import multer from "multer";
import path from "path";
import fs from "fs";
// Upload directory
const uploadPath = path.join(process.cwd(), "public", "uploads", "company-logos");
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
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}` +
            path.extname(file.originalname);
        cb(null, uniqueName);
    },
});
// File filter
const fileFilter = (_req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only JPG, JPEG, PNG, SVG and WEBP images are allowed."));
    }
    cb(null, true);
};
// Upload middleware
export const companyLogoUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB
    },
}).single("companyLogo");
