import fs from "fs";
import path from "path";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import { LoadImagesDecorator } from "../decorators/load-images-decorator.js";

export const generatePdfFromImages = LoadImagesDecorator(
  async (images, dir, out) => {
    try {
      const pdfDoc = await PDFDocument.create();
      for (const file of images) {
        const imagePath = path.join(dir, file);
        const imageBuffer = fs.readFileSync(imagePath);
        const metadata = await sharp(imageBuffer).metadata();
        let image;
        if (file.endsWith(".png")) {
          image = await pdfDoc.embedPng(imageBuffer);
        } else {
          image = await pdfDoc.embedJpg(imageBuffer);
        }
        const page = pdfDoc.addPage([metadata.width, metadata.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: metadata.width,
          height: metadata.height,
        });
        console.log(`✅ Image added: ${file}`);
      }
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync(out, pdfBytes);
      console.log(`✅ PDF successfully generated: ${out}`);
    } catch (error) {
      console.error("❗ Error ao gerar o PDF: ", errpr);
    }
  }
);
