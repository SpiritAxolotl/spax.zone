const fs = require("fs");
const { readPage } = require("./utils.js");

const targetPage = "./allnahuafaces.html";
const directory = "./images/faces/nahua/";

const { document } = await readPage(targetPage);
fs.writeFileSync(targetPage, _ => {
  document;
});