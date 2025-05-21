const fs = require('fs');
const { parseHTML } = require('linkedom');

const readPage = async (page) => {
  try {
    const html = await fs.promises.readFile(page, "utf8");
    const dom = parseHTML(html);
    return dom;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

module.exports = { readPage };