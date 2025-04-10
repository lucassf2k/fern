import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import sharp from "sharp";
import pLimit from "p-limit";
import { LoadImagesDecorator } from "../../decorators/load-images-decorator.js";

const OUTPUT_FILENAME = "fernout";
const LIMIT = pLimit(10);

export const convertAllImagesToJpg = LoadImagesDecorator(
  async (images, dir) => {
    try {
      const outputDir = join(dir, OUTPUT_FILENAME);
      if (!existsSync(outputDir)) mkdirSync(outputDir);
      const tasks = images.map((file, index) =>
        LIMIT(async () => {
          const sequenceNumber = index + 1;
          const formattedNumber =
            sequenceNumber < 10 ? `0${sequenceNumber}` : `${sequenceNumber}`;
          const newFilename = `${formattedNumber}.jpg`;
          const inputPath = join(dir, file);
          const outputPath = join(outputDir, newFilename);
          console.log(
            `✅ Image converted: ${file} to ${OUTPUT_FILENAME}/${newFilename}`
          );
          await sharp(inputPath).jpeg({ quality: 100 }).toFile(outputPath);
        })
      );
      await Promise.all(tasks);
      return tasks.length;
    } catch (error) {
      console.log(`😢 Error: ${error}`);
    }
  }
);
