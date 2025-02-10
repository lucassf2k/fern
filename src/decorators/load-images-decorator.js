import { readdirSync } from "fs";
import {
  filteredByImages,
  sortedAscOrderNumericallyAlphabetically,
} from "../utils/filters.js";

export function LoadImagesDecorator(fn) {
  return (dir, aux) => {
    const images = readdirSync(dir)
      .filter(filteredByImages)
      .sort(sortedAscOrderNumericallyAlphabetically); // Ordena os arquivos
    if (images.length === 0) {
      console.log("😢 No image found in the folder.");
      return;
    }
    console.log("📂 Uploaded images:");
    return fn(images, dir, aux);
  };
}
