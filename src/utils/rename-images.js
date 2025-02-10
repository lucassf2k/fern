import fs from "fs";
import path from "path";
import { LoadImagesDecorator } from "../decorators/load-images-decorator.js";

export const renameImagesAscStartingNumber = LoadImagesDecorator(
  (images, dir, startNumber) => {
    let countOfImages = 0;
    images.map(async (image, index) => {
      const ext = path.extname(image); // Obtém a extensão do arquivo
      const newImageNumbering = startNumber + index;
      //.padStart(3, "0"); // A contagem começa com o número indicado pelo usuário
      const renamedImage = `${newImageNumbering}${ext}`; // Novo nome com 3 dígitos
      const oldPath = path.join(dir, image);
      const newPath = path.join(dir, renamedImage);
      // Renomeia o arquivo
      fs.renameSync(oldPath, newPath);
      console.log(`Arquivo ${image} renomeado para ${renamedImage}`);
      countOfImages++;
    });
    return countOfImages;
  }
);
