import { extname } from "path";

const TIMAGES = Object.freeze([".jpg", ".jpeg", ".png", ".gif"]);
const TPDFS = Object.freeze([".pdf", ".cbr", ".cbz"]);

export function sortedAscOrderNumericallyAlphabetically(a, b) {
  // Tenta extrair números dos nomes dos arquivos
  const numeroA = a.match(/\d+/)?.[0];
  const numeroB = b.match(/\d+/)?.[0];
  // Se ambos os arquivos têm números, compara-os numericamente
  if (numeroA && numeroB) {
    return parseInt(numeroA, 10) - parseInt(numeroB, 10);
  }
  // Se um dos arquivos tem número, coloca ele antes, caso contrário, ordena alfabeticamente
  if (numeroA) return -1; // A tem número, então vem antes
  if (numeroB) return 1; // B tem número, então vem depois
  // Se ambos não têm números, compara alfabeticamente
  return a.localeCompare(b);
}

export function filteredByImages(file) {
  return TIMAGES.includes(extname(file).toLowerCase());
}

export function filteredByPdf(file) {
  return TPDFS.includes(extname(file).toLowerCase());
}
