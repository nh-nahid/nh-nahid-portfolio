import fs from "fs";
import path from "path";

/**
 * Safely deletes a file from the uploads directory if it exists.
 * @param relativePath Relative path from the public/uploads directory (e.g., "avatars/file.jpg" or "projects/file.png")
 */
export const deleteUploadFile = (relativePath: string): boolean => {
  if (!relativePath) return false;

  const absolutePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    relativePath
  );

  try {
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      return true;
    }
  } catch (error) {
    console.error(`❌ Failed to delete file at ${absolutePath}:`, error);
  }
  return false;
};
