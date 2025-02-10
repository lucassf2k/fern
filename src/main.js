#!/usr/bin/env node
import {
  generatePdfFromImages,
  In,
  renameImagesAscStartingNumber,
} from "./utils/index.js";

export const main = async () => {
  console.log("1 - Generate PDF from Images\n | 2 - Rename Images ");
  const option = parseInt(await In("Option: "), 10);
  switch (option) {
    case 1: {
      const dir = await In("Input (directory): ");
      const filename = await In("Output (filename): ");
      const out = `${dir}/../${filename}.pdf`;
      generatePdfFromImages(dir, out);
      break;
    }
    case 2: {
      const dir = await In("Input (directory): ");
      const start = parseInt(await In("Start (Ex.: 12): "), 10);
      const count = renameImagesAscStartingNumber(dir, start);
      console.log(`Imagens alteradas: ${count}`);
      break;
    }
    default: {
      console.log("Opção não disponível!");
      break;
    }
  }
};
