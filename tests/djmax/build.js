const XLSX = require("xlsx");
const fs = require("fs");
const { JSDOM } = require("jsdom");

const readXLSXFile = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const data = {};
  for (let i=1; i< workbook.SheetNames.length; i++) {
    const sheetName = workbook.SheetNames[i];
    const sheet = workbook.Sheets[sheetName];
    const sheetData = [];
    let colNames = [];
    for (let c=1; sheet[`${numToLabel(c)}1`]; c++) {
      let name = sheet[`${numToLabel(c)}1`].v;
      if (name === "Elligible")
        name = "Eligible";
      colNames.push(name);
    }
    let row = 2;
    let col = 1;
    let ref = sheet["!ref"].split(":").map(e=>{
      const match = e.match(/([A-Z]+)(\d+)/);
      return [labelToNum(match[1]), +match[2]];
    });
    while (row-2 < ref[1][1]) {
      const rowData = {};
      while (col <= ref[1][0]) {
        const cell = numToLabel(col) + row;
        if (sheet[cell]) {
          if (colNames[col-1])
            rowData[colNames[col-1]] = sheet[cell].v;
          else if (rowData.Notes)
            rowData.Notes += `\n${sheet[cell].v}`;
          else
            rowData.Notes = sheet[cell].v;
          if (col === 1 && sheet[cell].l)
            rowData.Link = sheet[cell].l.Target;
        }
        col++;
      }
      col = 1;
      if (Object.keys(rowData).length > 0 && rowData.Title && rowData.Artist && rowData.Eligible)
        sheetData.push(rowData);
      row++;
    }
    //const sheetData = XLSX.utils.sheet_to_json(sheet);
    data[sheetName] = sheetData;
  };
  return data;
};

const numToLabel = (n) => {
  let columnLabel = "";
  while (n > 0) {
    n--;
    columnLabel = String.fromCharCode(65 + (n % 26)) + columnLabel;
    n = Math.floor(n / 26);
  }
  return columnLabel;
};
const labelToNum = (l) => {
  let number = 0;
  for (let i = 0; i < l.length; i++) {
    number *= 26;
    number += l.charCodeAt(i) - 64;
  }
  return number;
};

const xlsxPath = "./tests/djmax/moD Jam MAX.xlsx";
const djmaxData = readXLSXFile(xlsxPath);
const pagePath = "./tests/djmax/index.html";
let dom = new JSDOM();

const main = () => {
  (async () => {
    fs.writeFileSync("./data/djmax.json", JSON.stringify(djmaxData));
    dom = await readPage(pagePath);
    fs.writeFileSync(pagePath, renderHTML(dom, dom.window.document));
  })();
};

const readPage = async (page) => {
  try {
    const html = await fs.promises.readFile(page, "utf8");
    const dom = new JSDOM(html);
    return dom;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

const optimizeForTag = (name) => {
  return name.toLowerCase().replaceAll(/\W+/g, "-");
};

const createOption = (name) => {
  const tag = optimizeForTag(name);
return `<div>
  <input type="checkbox" name="${tag}" checked />
  <label for="${tag}">${name}</label>
</div>\n`;
}

const renderHTML = (dom, document) => {
  let body = `\n    `;
  document.querySelectorAll(`#buildbelowme ~ :not(#buildaboveme):not(#buildaboveme ~ *)`)
    .forEach(e=>e.remove());
  document.body.innerHTML = document.body.innerHTML
    .replace(/(?<=<div id="buildbelowme"><\/div>)\s+(?=<div id="buildaboveme"><\/div>)/, "\n    ");
  for (const game of Object.keys(djmaxData))
    body += createOption(game).replaceAll("\n", "\n    ");
  document.querySelector(`#buildbelowme`).outerHTML += body.replace(/\s+$/, "");
  return dom.serialize();
};

if (require.main === module)
  main();