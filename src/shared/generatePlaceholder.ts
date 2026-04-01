import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const placeholderCache = new Map<string, string>();

/**
 * Generate a tiny blurred base64 placeholder for an image.
 * Returns a data URI suitable for use as a CSS background-image.
 */
export async function generatePlaceholder(imagePath: string): Promise<string> {
  if (!imagePath || !fs.existsSync(imagePath)) {
    return '';
  }

  if (placeholderCache.has(imagePath)) {
    return placeholderCache.get(imagePath)!;
  }

  try {
    const buffer = await sharp(imagePath)
      .resize(20)
      .blur(4)
      .jpeg({ quality: 40 })
      .toBuffer();

    const base64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    placeholderCache.set(imagePath, base64);
    return base64;
  } catch {
    return '';
  }
}

/**
 * Find the source file path for a content collection blog post's frontmatter image.
 * The image is co-located with the post's index.md file.
 */
export function resolvePostImagePath(slug: string, imgSrc: string): string {
  // imgSrc from Astro is a build URL like /_astro/filename.hash.jpg
  // We need to find the original file in src/content/blog/{slug}/
  const postDir = path.resolve(`src/content/blog/${slug}`);

  if (!fs.existsSync(postDir)) return '';

  // List files in the post directory and find the image
  // The imgSrc contains the original filename (before the hash)
  const files = fs.readdirSync(postDir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f));

  // Try to match by the original filename embedded in the Astro URL
  // e.g. /_astro/painted_shed.wF_3NGwH_Z180gyf.webp -> painted_shed
  const srcBasename = path.basename(imgSrc).split('.')[0];

  const match = imageFiles.find(f => {
    const fileBasename = path.basename(f, path.extname(f));
    return fileBasename === srcBasename ||
           fileBasename.replace(/[- ]/g, '_') === srcBasename.replace(/[- ]/g, '_');
  });

  if (match) {
    return path.join(postDir, match);
  }

  // Fallback: try matching frontmatter img value directly
  // Some posts may have img: ./filename.jpg
  for (const f of imageFiles) {
    if (imgSrc.includes(path.basename(f, path.extname(f)))) {
      return path.join(postDir, f);
    }
  }

  return '';
}
