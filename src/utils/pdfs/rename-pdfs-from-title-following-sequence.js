import { renameSync } from "fs";
import { extname, join } from "path";
import { LoadPdfsDecorator } from "../../decorators/load-pdfs-decorator.js";

export const renamePdfsFromTitleFollowingSequence = LoadPdfsDecorator(
  (pdfs, dir, filename) => {
    let countOfPdfs = 0;
    pdfs.forEach((pdf, index) => {
      const ext = extname(pdf);
      const sequenceNumver = index + 1;
      let newFilename = `${filename}${sequenceNumver}${ext}`;
      if (sequenceNumver < 10)
        newFilename = `${filename}0${sequenceNumver}${ext}`;
      const oldPath = join(dir, pdf);
      const newPath = join(dir, newFilename);
      renameSync(oldPath, newPath);
      console.log(`🔄 File ${pdf} renamed to ${newFilename}`);
      countOfPdfs++;
    });
    return countOfPdfs;
  }
);
