import fs from "node:fs";
import { parseHTML } from "linkedom";

export const readPage = (page) => {
  try {
    const html = fs.readFileSync(page, "utf8");
    const dom = parseHTML(html);
    return dom;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};