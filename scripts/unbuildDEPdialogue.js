/* for use when developing to make my life easier */
import fs from "node:fs";
import { targetPage } from "./buildDEPdialogue.js";
import { readPage } from "./utils.js";

const unbuild = async () => {
  const { document } = await readPage(targetPage);
  //clearArea(document);
  document.body.innerHTML = "";
  fs.writeFileSync(targetPage, document.toString());
};

unbuild();