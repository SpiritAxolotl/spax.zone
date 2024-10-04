/*
Hey! Spax here. I've started to join a few webrings (https://wikipedia.org/wiki/Webring),
but some of them use javascript to maintain/control/organize them. I would like to keep
most of my webpages static. This js file is my attempt at maximizing their compatibility
by running the js before the site is deployed.
*/

const { readPage } = require("./buildDEPdialogue.js");
const fs = require("fs");
const { VM } = require("vm2");

const targetPage = "./html/index.html";

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

const build = async () => {
  const { document, window } = await readPage(targetPage);
  const vm = new VM({
    sandbox: {
      document: document,
      window: window
    }
  });
  getJsFile("./js/cobalt-webring.js", "https://instances.hyper.lol/assets/js/webring.js", (err, data) => {
    if (err) console.error(err);
    else {
      try {
        vm.run(data);
        const webring = document.querySelector(`#cobaltWebring`);
        webring.removeAttribute("name");
        webring.removeAttribute("id");
        webring.removeAttribute("style");
        webring.insertAdjacentHTML("afterbegin", "part of the cobalt webring<br><br>");
        webring.querySelector(`a:nth-of-type(3)`).href = "https://random.spax.zone/cobalt-webring";
      } catch (error) {
        console.error("Error executing script:", error);
      }
      fs.writeFileSync(targetPage, document.toString());
    }
  });
};

if (require.main === module)
  build();