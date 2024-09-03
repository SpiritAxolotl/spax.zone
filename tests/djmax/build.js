const XLSX = require("xlsx");
const fs = require("fs");

const readXLSXFile = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const data = {};
  for (let i=1; i< workbook.SheetNames.length; i++) {
    const sheetName = workbook.SheetNames[i];
    const sheet = workbook.Sheets[sheetName];
    const sheetData = [];
    let colNames = [];
    for (let c=1; sheet[`${numToLabel(c)}1`]; c++)
      colNames.push(sheet[`${numToLabel(c)}1`].v);
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
          rowData[colNames[col-1] ?? "Notes"] = sheet[cell].v;
          if (col === 1 && sheet[cell].l)
            rowData.Link = sheet[cell].l.Target;
        }
        col++;
      }
      col = 1;
      if (Object.keys(rowData).length > 0)
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

const filePath = "./tests/djmax/moD Jam MAX.xlsx";
const xlsxData = readXLSXFile(filePath);

fs.writeFileSync("./data/djmax.json", JSON.stringify(xlsxData));