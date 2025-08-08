/*
Hey! Spax here. I've started to join a few webrings (https://wikipedia.org/wiki/Webring),
but some of them use javascript to maintain/control/organize them. I would like to keep
most of my webpages static. This js file is my attempt at maximizing their compatibility
by running the js before the site is deployed.
*/

const { readPage } = require("./utils.js");
const fs = require("fs");
const Jinter = require("jintr").default;
const { createHash } = require("crypto");

const targetPage = "./index.html";
const randomURL = "https://random.spax.zone/webrings";

const hashes = {
  cobalt: "50373b424944bf5a6e58cbb216e73613c58d784fbd0ea4af45778f398ad82f16",
  cohost: "d18a582628a1a05783d36e62f4c1262cfff0dbdec717aff644f6d71b869e91d2"
}

const getJsFile = async (local, links) => {
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
      "Accept": "text/javascript",
      "Content-Type": "text/javascript",
      "User-Agent": "SPAX-WEBRING-FETCH"
    });
    
    for (const link of links) {
      try {
        const response = await fetch(link, {
          method: "GET",
          headers: headers
        });
        if (response.ok)
          return await response.text();
      } catch (err) {
        continue;
      }
    }
    throw new Error("Failed to fetch JS file from all provided links.");
  } catch (err) {
    throw err;
  }
};

const fetchJSON = async (url) => {
  let data = [];
  await fetch(url)
    .then(response => response.json())
    .then(d => data = d);
  return data;
};

const genHash = (str) => {
  const normalized = str.replaceAll("\r\n", "\n").trim();
  return createHash("sha256").update(normalized).digest("hex");
};

const webringDown = (document, selector, webringName, err) => {
  document.querySelector(selector).textContent =
    `The ${webringName} is currently down! Might be a good idea to let Spax know.`;
  console.error(err);
};

const build = async () => {
  const { document, window } = await readPage(targetPage);
  const interpreter = new Jinter({
    scope: {
      document: document,
      window: window
    }
  });
  const dataFolderName = "./data/webring-members";
  if (!fs.existsSync(dataFolderName))
    fs.mkdirSync(dataFolderName);
  
  //cobalt
  /*try {
    const data = await getJsFile("./js/webrings/cobalt.js", [
      "https://instances.hyper.lol/assets/js/webring.js", //main
      //"https://raw.githubusercontent.com/hyperdefined/CobaltTester/refs/heads/master/web/assets/js/webring.js" //fallback
    ]);
    const webring = document.querySelector(`#cobaltWebring`);
    const oldContents = webring.innerHTML;
    webring.innerHTML = "";
    const hash = genHash(data);
    if (hash === hashes.cobalt) {
      interpreter.evaluate(data);
      fs.writeFileSync(
        `${dataFolderName}/cobalt.json`,
        JSON.stringify(interpreter.scope.get("cobaltWebring_members")
          .map(e=>`https://${e}`))
      );
      //webring.removeAttribute("name");
      //webring.removeAttribute("id");
      webring.removeAttribute("style");
      webring.insertAdjacentHTML("afterbegin", "part of the cobalt webring<br><br>");
      webring.querySelector(`a:nth-of-type(3)`).href = `${randomURL}/cobalt`;
      fs.writeFileSync(targetPage, document.toString());
    } else {
      webring.innerHTML = oldContents;
      console.warn("the cobalt script's hash didn't match! make sure it didn't update!\nthe hash:", hash);
    }
  } catch (err) {
    webringDown(document, "#cobaltWebring", "cobalt webring", err);
  }*/
  
  //cohost
  try {
    const data = await getJsFile("./js/webrings/cohost.js", [
      "https://chaiaeran.github.io/Eggbug-Eggring/onionring-widget.js", //main
      "https://raw.githubusercontent.com/ChaiaEran/Eggbug-Eggring/refs/heads/main/onionring-widget.js" //fallback
    ]);
    const webring = document.querySelector(`#eggbug-eggring`);
    const oldContents = webring.innerHTML;
    webring.innerHTML = "";
    try {
      const hash = genHash(data);
      if (hash === hashes.cohost) {
        let editedData = data;
        let eggsites = await fetchJSON("https://chaiaeran.github.io/Eggbug-Eggring/eggsites.json");
        fs.writeFileSync(`${dataFolderName}/cohost.json`, JSON.stringify(eggsites));
        editedData = editedData.replace(
          `const jsonRes = await fetch('https://chaiaeran.github.io/Eggbug-Eggring/eggsites.json')\n\n  ` +
          `var sites = await jsonRes.json()`,
          `var sites = ${JSON.stringify(eggsites)};`
        );
        editedData = editedData.replace(`window.location.href`, `"https://spax.zone/"`);
        editedData = editedData.replace(`This site is `, "");
        editedData = editedData.replace(`← previous`, "&lt;-");
        editedData = editedData.replace(`next →`, "-&gt;");
        editedData = editedData.replace(/(?<=\$\{(?:random|index)Text\})[\s\n]+/g, "");
        editedData = editedData.replace(/(?<=tag\.insertAdjacentHTML\('afterbegin', `[\s\S]*)  `/g, `\``);
        interpreter.evaluate(editedData);
        const randomATag = webring.querySelector(`a[href="javascript:void(0)"]`);
        webring.querySelectorAll(`.webring-prev, .webring-next`).forEach(e=>e.classList.add("nowrap"));
        randomATag.href = `${randomURL}/cohost`;
        randomATag.removeAttribute("onclick");
        fs.writeFileSync(targetPage, document.toString());
      } else {
        webring.innerHTML = oldContents;
        console.warn("the cohost script's hash didn't match! make sure it didn't update! the hash:", hash);
      }
    } catch (error) {
      webring.innerHTML = oldContents;
      console.error("Error executing script:", error);
    }
  } catch (err) {
    webringDown(document, "#eggbug-eggring", "eggbug eggring", err);
  }
};

if (require.main === module)
  build();