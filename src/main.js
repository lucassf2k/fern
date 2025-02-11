#!/usr/bin/env node
import {
  generatePdfFromImages,
  In,
  renameImagesAscStartingNumber,
  renamePdfsFromTitleFollowingSequence,
} from "./utils/index.js";

export const main = async () => {
  console.log(
    "💡\n1 - Generate PDF from Images\n2 - Rename Images\n3 - Rename PDFs"
  );
  const option = parseInt(await In("Option: "), 10);
  switch (option) {
    case 1: {
      const dir = await In("Directory: ");
      const filename = await In("Filename: ");
      const out = `${dir}/../${filename}.pdf`;
      generatePdfFromImages(dir, out);
      break;
    }
    case 2: {
      const dir = await In("Directory: ");
      const start = parseInt(await In("Start (Ex.: 12): "), 10);
      const count = renameImagesAscStartingNumber(dir, start);
      console.log(`✅ Changed images: ${count}`);
      break;
    }
    case 3: {
      const dir = await In("Directory: ");
      const filename = await In("Filenames: ");
      const count = renamePdfsFromTitleFollowingSequence(dir, filename);
      console.log(`✅ Changed PDFs: ${count}`);
      break;
    }
    default: {
      console.log(" ⚠️  Option not available!");
      break;
    }
  }
};
