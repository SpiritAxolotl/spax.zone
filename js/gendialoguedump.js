const fs = require("fs");
const util = require("util");

const DEP_Data_Path = "./data/DEP_data/";

const codeSearches = [101, 102, 401, 402];

const finalJSON = {};

const readFileAsync = util.promisify(fs.readFile);

const readJSONFile = async (filepath) => {
  try {
    const data = await readFileAsync(filepath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading file ${filepath}:`, err);
    return null;
  }
};

const isObject = (obj) => {
  return typeof obj === "object" && obj !== null;
};

const containsCodeKeyword = (obj) => {
  if ((Array.isArray(obj) ? obj : Object.values(obj)).some(e=>{return isObject(e)})) {
    for (const obj2 of (Array.isArray(obj) ? obj : Object.values(obj)).filter(e=>{return isObject(e)})) {
      if (containsCodeKeyword(obj2))
        return true;
    }
  }
  if (!Object.keys(obj).includes("code"))
    return false;
  if (isNaN(parseInt(obj.code)))
    return false;
  if (!codeSearches.includes(obj.code))
    return false;
  return true;
};

const processFile = async (path, file) => {
  const data = await readJSONFile(path + file);
  if (!data) return;
  
  const filteredData = [];
  const baseName = file.match(/^[^\.]+/)[0];
  
  if (Array.isArray(data)) {
    for (const obj of data) {
      if (obj !== null && containsCodeKeyword(obj)) {
        filteredData.push(obj);
      }
    }
  } else {
    for (const key of Object.keys(data)) {
      if (isObject(data[key]) && containsCodeKeyword(data[key])) {
        filteredData.push(...data[key].filter(e=>{return isObject(e)}));
      }
    }
  }
  if (filteredData.length > 0)
    finalJSON[baseName] = filteredData;
};

const main = async () => {
  const files = fs.readdirSync(DEP_Data_Path);
  console.log("Files to process:", files);
  
  const filePromises = files.map(file => {
    return processFile(DEP_Data_Path, file);
  });
  
  await Promise.all(filePromises);
  console.log("All files processed. Final JSON length:", Object.keys(finalJSON).length);
  fs.writeFileSync("./data/dep_event_dump.json", JSON.stringify(finalJSON));
};

if (require.main === module)
  main();