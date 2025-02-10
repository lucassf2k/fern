import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";
import {
  filteredByImages,
  sortedAscOrderNumericallyAlphabetically,
} from "./filters.js";
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
        console.log(`Imagem adicionada: ${file}`);
      }
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync(out, pdfBytes);
      console.log(`PDF gerado com sucesso: ${out}`);
    } catch (error) {
      console.error("Error ao gerar o PDF: ", errpr);
    }
  }
);

/**
 *
 * @param {String} dir
 * @param {String} out
 * @returns {Void}
 */
async function pdf(dir, out) {
  try {
    const files = fs
      .readdirSync(dir)
      .filter(filteredByImages)
      .sort(sortedAscOrderNumericallyAlphabetically); // Ordena os arquivos
    if (files.length === 0) {
      console.log("Nenhuma imagem encontrada na pasta.");
      return;
    }
    const pdfDoc = await PDFDocument.create();
    for (const file of files) {
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
      console.log(`Imagem adicionada: ${file}`);
    }
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(out, pdfBytes);
    console.log(`PDF gerado com sucesso: ${out}`);
  } catch (error) {
    console.error("Erro ao criar o PDF:", error);
  }
}
