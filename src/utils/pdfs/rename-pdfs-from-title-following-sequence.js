import { renameSync } from "fs";
import { extname, join } from "path";
import { LoadPdfsDecorator } from "../../decorators/load-pdfs-decorator.js";

export const renamePdfsFromTitleFollowingSequence = LoadPdfsDecorator(
  (pdfs, dir, filename) => {
    let countOfPdfs = 0;
    pdfs.map(async (pdf, index) => {
      const ext = extname(pdf);
      let newFilename = `${filename}${index}${ext}`;
      if (index < 10) newFilename = `${filename}0${index}${ext}`;
      const oldPath = join(dir, pdf);
      const newPath = join(dir, newFilename);
      renameSync(oldPath, newPath);
      console.log(`🔄 File ${pdf} renamed to ${newFilename}`);
      countOfPdfs++;
    });
    return countOfPdfs;
  }
);
