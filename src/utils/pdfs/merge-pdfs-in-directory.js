import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { PDFDocument } from "pdf-lib";
import { LoadPdfsDecorator } from "../../decorators/load-pdfs-decorator.js";

const OUTPUT_PATH = "fernout";

export const mergerPdfsInDirectory = LoadPdfsDecorator(
  async (pdfs, dir, filename) => {
    try {
      const outputDir = join(dir, OUTPUT_PATH);
      if (!existsSync(outputDir)) mkdirSync(outputDir);
      const mergedPdf = await PDFDocument.create();
      let total = 0;
      for (const file of pdfs) {
        const filePath = join(dir, file);
        const pdfBytes = readFileSync(filePath);
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        console.log(`✅ PDF adicionado: ${file}`);
        total++;
      }
      const mergedPdfBytes = await mergedPdf.save();
      const outputFile = join(outputDir, `${filename}.pdf`);
      writeFileSync(outputFile, mergedPdfBytes);
      console.log(`✅ PDF final gerado com sucesso: ${outputFile}`);
      return total;
    } catch (error) {
      console.error("❗ Erro ao mesclar os PDFs:", error);
    }
  }
);
