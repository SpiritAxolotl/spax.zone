// TODO: FINISH WRITING THIS

const fs = require("fs");
const { readPage } = require("./utils.js");

const targetPage = "./allnahuafaces.html";
const directory = "./assets/faces/nahua/";

const { document } = await readPage(targetPage);
fs.writeFileSync(targetPage, _ => {
  document;
});