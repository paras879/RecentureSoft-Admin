import fs from "fs";
import path from "path";

/**
 * Checks if the given image path exists under the public directory.
 * If the path ends with .webp and does not exist, looks for alternative
 * formats (.jpg, .jpeg, .png) and returns the correct path.
 */
export function resolveImagePath(src: string): string {
  if (!src) return "";
  
  // If the path is an external URL, return it as is
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  
  // Clean up leading slash for local disk check, but keep it in the return path
  const normalizedSrc = src.startsWith("/") ? src : `/${src}`;
  const publicPath = path.join(process.cwd(), "public", normalizedSrc);
  
  if (fs.existsSync(publicPath)) {
    return normalizedSrc;
  }
  
  // Try mapping the extension (specifically for .webp paths where only .jpg/.jpeg/.png exists)
  const ext = path.extname(normalizedSrc);
  if (ext.toLowerCase() === ".webp") {
    const baseWithoutExt = normalizedSrc.substring(0, normalizedSrc.length - ext.length);
    for (const alternativeExt of [".jpg", ".jpeg", ".png", ".webp"]) {
      const altPath = baseWithoutExt + alternativeExt;
      const altPublicPath = path.join(process.cwd(), "public", altPath);
      if (fs.existsSync(altPublicPath)) {
        return altPath;
      }
    }
  }
  
  return normalizedSrc;
}
