const fs = require("fs");
const path = require("path");
const { readPage } = require("./utils.js");

const blacklist = ["main2.html"];

const defaultTags = {
  "meta": [
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
      "content": "https://spax.zone/images/faces/nahua/Neutral.png",
      "type": "image/png"
    }
  ],
  "link": [
    {
      "rel": "icon",
      "href": "/images/icons/Nahua_Neutral.png"
    }
  ]
};

//mirror <title> to <meta type="og:title"> and <meta name="description"> to <meta type="og:description">
//don't add og: title and description to pages with <meta property="twitter:card" content="summary_large_image">
//maybe add lang="en-US" to the html tag?

const filepath = "./";

const propertyIsGeneric = (tagname, tag) => {
  switch (tagname) {
    case "meta":
      return ["property", "name"].includes(Object.keys(tag)[0]);
    case "link":
      return ["rel"].includes(Object.keys(tag)[0]);
  }
};

const addMetadata = (document) => {
  const head = document.head;
  const leadingSpaces = (head.innerHTML.match(/^[\r\n]*( *)/)?.[1] ?? "").length;
  const createAndAddTag = (tagname, properties) => {
    const tag = document.createElement(tagname);
    for (const [key, value] of Object.entries(properties).reverse())
      tag.setAttribute(key, value);
    head.insertAdjacentHTML("afterbegin", `\n${" ".repeat(leadingSpaces)}${tag.toString()}`);
  };
  
  const title = head.querySelector(`title`);
  const description = head.querySelector(`meta[name="description"]`);
  if (head.querySelector(`meta[property="twitter:card"][content="summary_large_image"]`) === null) {
    if (head.querySelector(`meta[name="og:title"]`) === null && title !== null)
      createAndAddTag("meta", {"name": "og:title", "content": title.textContent});
    if (head.querySelector(`meta[name="og:description"]`) === null && description !== null)
      createAndAddTag("meta", {"name": "og:description", "content": description.getAttribute("content")});
  }
  
  for (let i=Object.keys(defaultTags).length-1; i>=0; i--) {
    const tagname = Object.keys(defaultTags)[i];
    for (let j=defaultTags[tagname].length-1; j>=0; j--) {
      const tag = defaultTags[tagname][j];
      let selector = Object.keys(tag)[0];
      if (propertyIsGeneric(tagname, tag))
        selector += `="${Object.values(tag)[0]}" i`;
      if (document.head.querySelector(`${tagname}[${selector}]`) === null)
        createAndAddTag(tagname, tag);
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
      if (stat.isFile() && file.endsWith(".html") && !blacklist.includes(file)) {
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