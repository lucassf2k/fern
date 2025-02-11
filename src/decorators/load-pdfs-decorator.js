import { readdirSync } from "fs";
import {
  filteredByPdf,
  sortedAscOrderNumericallyAlphabetically,
} from "../utils/filters.js";

export function LoadPdfsDecorator(fn) {
  return (dir, filename) => {
    const pdfs = readdirSync(dir)
      .filter(filteredByPdf)
      .sort(sortedAscOrderNumericallyAlphabetically);
    if (pdfs.length === 0) {
      console.log("😢 No pdf found in the folder.");
      return;
    }
    console.log("📂 Uploaded pdfs!");
    return fn(pdfs, dir, filename);
  };
}
