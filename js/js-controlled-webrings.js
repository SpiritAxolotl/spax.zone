/*
Hey! Spax here. I've started to join a few webrings (https://wikipedia.org/wiki/Webring),
but some of them use javascript to maintain/control/organize them. I would like to keep
most of my webpages static. This js file is my attempt at maximizing their compatibility
by running the js before the site is deployed.
*/

const { readPage } = require("./buildDEPdialogue.js");
const fs = require("fs");
const { VM } = require("vm2");
const { createHash } = require("crypto");

const targetPage = "./html/index.html";
const randomURL = "https://random.spax.zone/webrings";

const hashes = {
  cobalt: "50373b424944bf5a6e58cbb216e73613c58d784fbd0ea4af45778f398ad82f16",
  cohost: "d18a582628a1a05783d36e62f4c1262cfff0dbdec717aff644f6d71b869e91d2"
}

const getJsFile = (local, link, callback) => {
  if (!fs.existsSync(local)) {
    const headers = new Headers({
      "Accept": "text/javascript",
      "Content-Type": "text/javascript",
      "User-Agent": "SPAX-WEBRING-FETCH"
    });
    return fetch(link, {
      method: "GET",
      headers: headers
    })
      .then(response => response.text())
      .then(data => callback(null, data))
      .catch(err => callback(err, null));
  }
  fs.readFile(local, "utf8", (err, data) => {
    if (err)
      return callback(err, null);
    return callback(null, data);
  });
};

const fetchJSON = async (url) => {
  let data = [];
  await fetch(url)
    .then(response => response.json())
    .then(d => data = d);
  return data;
};

const genHash = (str) => {
  const hashObj = createHash("sha256");
  let hash = "";
  hashObj.on("readable", () => {
    const d = hashObj.read();
    if (d) hash = d.toString("hex");
  });
  hashObj.write(str.replaceAll("\r\n", "\n").trim()); //normalize the damn thing
  hashObj.end();
  return hash;
};

const build = async () => {
  const { document, window } = await readPage(targetPage);
  const vm = new VM({
    sandbox: {
      document: document,
      window: window
    }
  });
  const dataFolderName = "./data/webring-members";
  if (!fs.existsSync(dataFolderName))
    fs.mkdirSync(dataFolderName);
  getJsFile(
    "./js/webrings/cobalt.js",
    "https://instances.hyper.lol/assets/js/webring.js",
    (err, data) => {
    if (err) console.error(err);
    else {
      const webring = document.querySelector(`#cobaltWebring`);
      const oldContents = webring.innerHTML;
      webring.innerHTML = "";
      const hash = genHash(data);
      if (hash === hashes.cobalt) {
        vm.run(data);
        fs.writeFileSync(
          `${dataFolderName}/cobalt.json`,
          JSON.stringify(vm.getGlobal("cobaltWebring_members")
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
    }
  });
  getJsFile(
    "./js/webrings/cohost.js",
    "https://chaiaeran.github.io/Eggbug-Eggring/onionring-widget.js",
    async (err, data) => {
    if (err) console.error(err);
    else {
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
          vm.run(editedData);
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
    }
  });
};

if (require.main === module)
  build();