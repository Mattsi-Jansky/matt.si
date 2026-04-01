import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const MAX_WIDTH = 1240;

/**
 * Astro integration that optimizes and copies images from blog post directories
 * to public/_figure-images/ so the rehype-figure plugin can reference them.
 * Also generates a placeholders manifest for blur-up loading.
 */
export default function copyFigureImages() {
  return {
    name: 'copy-figure-images',
    hooks: {
      'astro:config:setup': async () => {
        const contentDir = path.resolve('src/content/blog');
        const outputDir = path.resolve('public/_figure-images');
        const placeholders = {};

        const imageFiles = [];

        function collectImages(srcDir, relativePath = '') {
          const entries = fs.readdirSync(srcDir, { withFileTypes: true });
          for (const entry of entries) {
            const srcPath = path.join(srcDir, entry.name);
            const relPath = path.join(relativePath, entry.name);

            if (entry.isDirectory()) {
              collectImages(srcPath, relPath);
            } else if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(entry.name)) {
              imageFiles.push({ srcPath, relPath });
            }
          }
        }

        collectImages(contentDir);

        await Promise.all(
          imageFiles.map(async ({ srcPath, relPath }) => {
            const ext = path.extname(relPath).toLowerCase();
            const destPath = path.join(outputDir, relPath);

            fs.mkdirSync(path.dirname(destPath), { recursive: true });

            // GIFs and SVGs: copy as-is, no placeholder
            if (ext === '.gif' || ext === '.svg') {
              fs.copyFileSync(srcPath, destPath);
              return;
            }

            // Optimize image
            try {
              const pipeline = sharp(srcPath)
                .resize({ width: MAX_WIDTH, withoutEnlargement: true });

              if (ext === '.png') {
                await pipeline.png({ quality: 80 }).toFile(destPath);
              } else if (ext === '.jpg' || ext === '.jpeg') {
                await pipeline.jpeg({ quality: 80 }).toFile(destPath);
              } else {
                await pipeline.webp({ quality: 80 }).toFile(destPath);
              }
            } catch (e) {
              fs.copyFileSync(srcPath, destPath);
            }

            // Generate base64 placeholder
            try {
              const buffer = await sharp(srcPath)
                .resize(20)
                .blur(4)
                .jpeg({ quality: 40 })
                .toBuffer();
              const key = `/_figure-images/${relPath}`;
              placeholders[key] = `data:image/jpeg;base64,${buffer.toString('base64')}`;
            } catch {
              // skip placeholder on error
            }
          })
        );

        // Write placeholders manifest for rehype-figure to read
        const manifestDir = path.resolve('src/plugins');
        fs.writeFileSync(
          path.join(manifestDir, 'figure-placeholders.json'),
          JSON.stringify(placeholders)
        );
      },
    },
  };
}
