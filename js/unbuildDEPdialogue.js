/* for use when developing to make my life easier */
const fs = require('fs');
const { targetPage, readPage } = require("./buildDEPdialogue.js");

const unbuild = async () => {
  const { document } = await readPage(targetPage);
  //clearArea(document);
  document.body.innerHTML = "";
  fs.writeFileSync(targetPage, document.toString());
};

if (require.main === module)
  unbuild();