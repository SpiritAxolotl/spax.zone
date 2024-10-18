const fs = require("fs");
const path = require("path");
const { readPage } = require("./buildDEPdialogue.js");

const defaultMetaTags = [
  {
    "charset": "utf-8"
  },
  {
    "http-equiv": "X-UA-Compatible",
    "content": "IE=edge"
  },
  {
    "name": "viewport",
    "content": "width=device-width, initial-scale=1"
  },
  {
    "name": "theme-color",
    "content": "#306850"
  },
  {
    "name": "darkreader-lock"
  },
  {
    "color-scheme": "only dark"
  },
  {
    "property": "og:type",
    "content": "website"
  },
  {
    "property": "og:image",
    "content": "https://spax.zone/images/faces/spax/Smirk.png",
    "type": "image/png"
  }
];

//mirror <title> to <meta type="og:title"> and <meta name="description"> to <meta type="og:description">
//don't add og: title and description to pages with <meta property="twitter:card" content="summary_large_image">
//maybe add lang="en-US" to the html tag?

const filepath = "./html/";

const addMetadata = (document) => {
  const head = document.head;
  const leadingSpaces = (head.innerHTML.match(/^[\r\n]*( *)/)?.[1] ?? "").length;
  const createAndAddMetaTag = (tag) => {
    const meta = document.createElement("meta");
    for (const [key, value] of Object.entries(tag).toReversed())
      meta.setAttribute(key, value);
    head.insertAdjacentHTML("afterbegin", `\n${" ".repeat(leadingSpaces)}${meta.toString()}`);
  };
  
  const title = head.querySelector(`title`);
  const description = head.querySelector(`meta[name="description"]`);
  if (head.querySelector(`meta[property="twitter:card"][content="summary_large_image"]`) === null) {
    if (head.querySelector(`meta[property="og:title"]`) === null && title !== null)
      createAndAddMetaTag({"name": "og:title", "content": title.textContent});
    if (head.querySelector(`meta[property="og:description"]`) === null && description !== null)
      createAndAddMetaTag({"name": "og:description", "content": description.getAttribute("content")});
  }
  
  for (let i=defaultMetaTags.length-1; i>=0; i--) {
    const tag = defaultMetaTags[i];
    const attributes = Object.keys(tag);
    let selector = attributes[0];
    if (["property", "name"].includes(attributes[0]))
      selector += `="${Object.values(tag)[0]}" i`;
    if (document.head.querySelector(`meta[${selector}]`) === null) {
      createAndAddMetaTag(tag);
    }
  }
};

(async () => {
  try {
    const files = await fs.promises.readdir(filepath);
    for (let i=0; i<files.length; i++) {
      const file = files[i];
      const fullpath = path.join(filepath, file);
      const stat = await fs.promises.stat(fullpath);
      if (stat.isFile() && file.endsWith(".html")) {
        const { document } = await readPage(fullpath);
        addMetadata(document);
        fs.writeFileSync(fullpath, document.toString());
      }
    }
    console.log("Done adding page metadata!");
  }
  catch(e) {
    console.error(e);
  }
})();