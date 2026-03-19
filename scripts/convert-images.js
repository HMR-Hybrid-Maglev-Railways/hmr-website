import sharp from "sharp";
import { readdir, access } from "fs/promises";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, "../public");

const configs = [
  {
    dir: join(publicDir, "images"),
    maxWidth: 1300,
    maxHeight: 870,
    quality: 80,
  },
  {
    dir: join(publicDir, "team_photos/team"),
    maxWidth: 1500,
    maxHeight: 1100,
    quality: 80,
  },
  {
    dir: join(publicDir, "team_photos/personal"),
    maxWidth: 700,
    maxHeight: 1050,
    quality: 82,
  },
];

async function convertDir({ dir, maxWidth, maxHeight, quality }) {
  let files;
  try {
    files = await readdir(dir);
  } catch {
    console.log(`Skipping ${dir} (not found)`);
    return;
  }

  const images = files.filter((f) =>
    [".jpg", ".jpeg", ".png"].includes(extname(f).toLowerCase())
  );

  for (const file of images) {
    const src = join(dir, file);
    const dest = join(dir, basename(file, extname(file)) + ".webp");

    try {
      await access(dest);
      console.log(`  skip  ${file} (webp exists)`);
      continue;
    } catch {
      // doesn't exist yet, convert it
    }

    await sharp(src)
      .resize(maxWidth, maxHeight, { fit: "inside", withoutEnlargement: true })
      .webp({ quality })
      .toFile(dest);

    const { size: srcSize } = await import("fs").then((m) =>
      m.promises.stat(src)
    );
    const { size: destSize } = await import("fs").then((m) =>
      m.promises.stat(dest)
    );
    const savings = (((srcSize - destSize) / srcSize) * 100).toFixed(0);
    console.log(
      `  ✓  ${file} → ${basename(dest)}  (${(srcSize / 1024).toFixed(0)} KB → ${(destSize / 1024).toFixed(0)} KB, −${savings}%)`
    );
  }
}

console.log("Converting images to WebP…\n");
for (const config of configs) {
  console.log(`📁 ${config.dir.replace(publicDir, "public")}`);
  await convertDir(config);
}
console.log("\nDone.");
