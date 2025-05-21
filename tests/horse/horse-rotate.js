const fs = require("fs");
const { parseHTML } = require("linkedom");

const getHTMLFile = async (local, link) => {
  try {
    try {
      const data = await fs.promises.readFile(local, "utf8");
      return data;
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }
    
    const headers = new Headers({
      "Accept": "text/html",
      "Content-Type": "text/html",
      "User-Agent": "SPAX-HORSE-FETCH"
    });
    
    const response = await fetch(link, {
      method: "GET",
      headers: headers
    });
    if (response.ok)
      return await response.text();
  } catch (err) {
    throw err;
  }
};

const main = async () => {
  const data = await getHTMLFile("./data/every.horse.html", "https://every.horse");
  const { document } = parseHTML(data);
  const stats = document.querySelector(`main.page-content div.wrapper div.home p:nth-of-type(2)`).textContent
    .match(/There are currently (\d+) horse domains. \(Last checked at: (\d{1,2} [a-zA-Z]+, \d{1,})\)/);
  const horseDomains = Array.from(document.querySelectorAll(`#the-list + p > a`))
    .map(a => a.href.match(/(?<=https?:\/\/)[\w_-]+(?:\.[\w_-]+)*/)[0]);
  fs.writeFileSync("./data/every_horse.json", JSON.stringify(horseDomains));
};

if (require.main === module)
  main();