import { readdirSync } from "fs";
import {
  filteredByImages,
  sortedAscOrderNumericallyAlphabetically,
} from "../utils/compare-fn.js";

export function LoadImagesDecorator(fn) {
  return (dir, aux) => {
    const images = readdirSync(dir)
      .filter(filteredByImages)
      .sort(sortedAscOrderNumericallyAlphabetically); // Ordena os arquivos
    if (images.length === 0) {
      console.log("Nenhuma imagem encontrada na pasta.");
      return;
    }
    console.log("📂 Imagens carregadas:");
    return fn(images, dir, aux);
  };
}
