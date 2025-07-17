const fs = require("fs");
const { ToadScheduler, SimpleIntervalJob, Task, AsyncTask } = require("toad-scheduler");
const { parseHTML } = require("linkedom");

//progress represented by [0-1) so the general order is maintained when new sites are added
let progress = 0;
const scheduler = new ToadScheduler();
const horseListProgressFile = `./data/horseListProgress.txt`;
let horseList = ["every.horse"];

const dataDirectory = `data`;
const everyHorseFilepath = `${dataDirectory}/every_horse.json`;
const actualHorseFilepath = `${dataDirectory}/actual_horse.json`;
const registeredHorseFilepath = `${dataDirectory}/registered_horse.json`;
const redirectsHorseFilepath = `${dataDirectory}/redirects_horse.json`;
const blankHorseFilepath = `${dataDirectory}/blank_horse.json`;
//const everyHorseDataFilepath = `${dataDirectory}/every_horse_data.json`;

const horseBins = {
  registered: new Set(), //as in JUST registered and no ip
  blank: new Set(),
  parked: new Set(),
  redirects: new Set(),
  actual: new Set()
};
//let everyHorseData = {};

const horseFilepath = (horseType) => {
  return `data/${horseType}_horse.json`;
};

const createAnsiHyperlink = (url, text) => {
  return `\u001b]8;;${url}\u001b\\${text}\u001b]8;;\u001b\\`;
};

const getHTMLFile = async (link, local, ua) => {
  try {
    const headers = new Headers({
      "Accept": "text/html",
      "Content-Type": "text/html",
      "User-Agent": `${ua?ua + " (":""}https://spax.zone/repo/tests/horse${ua?")":""}`
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
  if (local) {
    try {
      const data = await fs.promises.readFile(local, "utf8");
      return data;
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }
  }
};

const getJSONFile = async (link) => {
  try {
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Spax's Daily Horselist Fetch (https://spax.zone/repo/tests/horse)"
    });
    
    const response = await fetch(link, {
      method: "GET",
      headers: headers
    });
    if (response.ok)
      return await response.json();
  } catch (err) {
    throw err;
  }
};

//for transparency, this method was written by claude.ai, based off of my old code which wasn't as good
//i edited out the comments and tweaked it to my own preferences
//my old code can be found in this gist: https://gist.github.com/SpiritAxolotl/a8bbe4dea39eedb4a750c66702a44a7f
const sortHorseList = (list) => {
  list.sort((a, b) => {
    const aMatch = a.match(/((?:[\w_-]+\.)*)((?:[\w_-]+\.)[\w_-]+)/);
    const bMatch = b.match(/((?:[\w_-]+\.)*)((?:[\w_-]+\.)[\w_-]+)/);
    
    if (!aMatch || !bMatch) {
      return a.localeCompare(b);
    }
    
    const aDomain = aMatch[2];
    const bDomain = bMatch[2];
    
    if (aDomain !== bDomain) {
      return aDomain.localeCompare(bDomain);
    }
    
    const aSub = aMatch[1];
    const bSub = bMatch[1];
    
    if (aSub === "" && bSub !== "") {
      return -1;
    }
    if (aSub !== "" && bSub === "") {
      return 1;
    }
    
    if (aSub !== "" && bSub !== "") {
      const aSubParts = aSub.split(".").filter(part => part !== "");
      const bSubParts = bSub.split(".").filter(part => part !== "");
      
      const minLength = Math.min(aSubParts.length, bSubParts.length);
      
      for (let i = 0; i < minLength; i++) {
        const aSubPart = aSubParts[aSubParts.length - 1 - i];
        const bSubPart = bSubParts[bSubParts.length - 1 - i];
        
        if (aSubPart !== bSubPart) {
          return aSubPart.localeCompare(bSubPart);
        }
      }
      
      return aSubParts.length - bSubParts.length;
    }
    return a.localeCompare(b);
  });
  
  return list;
};

const incrementProgress = async () => {
  const p = Math.round(progress * horseList.length);
  progress = ((p+1)%horseList.length)/horseList.length;
  fs.writeFileSync(horseListProgressFile, `${progress}`);
  return p;
};

const binAdjust = (domain, ...arr) => {
  const bins = ["blank", "parked", "registered", "redirects", "actual"];
  for (const bin of bins) {
    if (arr.includes(bin)) {
      horseBins[bin].add(domain);
    } else {
      horseBins[bin].delete(domain);
    }
  }
  fs.writeFileSync(`./${actualHorseFilepath}`, JSON.stringify(sortHorseList([...horseBins.actual])));
  fs.writeFileSync(`./${registeredHorseFilepath}`, JSON.stringify(sortHorseList([...horseBins.registered])));
  fs.writeFileSync(`./${redirectsHorseFilepath}`, JSON.stringify(sortHorseList([...horseBins.redirects])));
  fs.writeFileSync(`./${blankHorseFilepath}`, JSON.stringify(sortHorseList([...horseBins.blank])));
};

const parseHorseListSite = (document) => {
  let list = [];
  const stats = document.querySelector(`main.page-content div.wrapper div.home p:nth-of-type(2)`).textContent
    .match(/There are currently (\d+) horse domains. \(Last checked at: (\d{1,2} [A-Z][a-z]*, \d{1,})\)/);
  list = Array.from(document.querySelectorAll(`#the-list + p > a`))
    .map(a => a.textContent.match(/[\w_-]+(?:\.[\w_-]+)*/)[0]);
  list.splice(list.findIndex(e=>e==="horse"), 1);
  return list;
};

const fetchHorseList = async () => {
  console.log("Fetching horselist from every.horse...");
  try {
    const data = await getHTMLFile("https://every.horse", undefined, "Spax's Periodic Horse Domain Check-Up");
    const { document } = parseHTML(data);
    horseList = parseHorseListSite(document);
    sortHorseList(horseList);
    console.log("Horselist retreived!\n");
    fs.writeFileSync(`./${everyHorseFilepath}`, JSON.stringify(horseList));
    return;
  } catch (err) {
    console.log("Unable to get new horselist. Here's the error:");
    console.error(err);
    console.log("Attempting to use an archived list...");
  }
  try {
    const data = await getHTMLFile(`https://web.archive.org/web/${(new Date()).getFullYear() + 1}0000000000/https://every.horse`, undefined, "Spax's Periodic Horse Domain Check-Up");
    const { document } = parseHTML(data);
    horseList = parseHorseListSite(document);
    sortHorseList(horseList);
    console.log("Horselist retreived!\n");
    fs.writeFileSync(`./${everyHorseFilepath}`, JSON.stringify(horseList));
    return;
  } catch {
    console.log("Unable to get archived horselist. Here's the error:");
    console.error(err);
    //console.log("Attempting to use an old list...");
    //horseList = getJSONFile(`https://spax.zone/${filepath}`);
  }
};

const horseRotate = async (domain) => {
  let p = 0;
  const debugDomain = typeof domain === "string";
  if (!debugDomain) {
    console.log(`Current progress: ${(progress * 100).toFixed(3)}%`);
    p = await incrementProgress();
  }
  const horse = domain ?? horseList[p];
  console.log(`Current date and time: ${(new Date()).toString()}`);
  console.log("Current horse domain:", createAnsiHyperlink(`http://${horse}`, horse), `(${horse})`);
  let document = undefined;
  let fetchResponse = new Response();
  try {
    const headers = new Headers({
      "Accept": "text/html",
      "Content-Type": "text/html",
      "User-Agent": `Spax's Periodic Horse Domain Check-Up (https://spax.zone/repo/tests/horse)`
    });
    
    try {
      fetch(`http://${horse}`, {
        method: "GET",
        headers: headers
      }).then((response) => {
        fetchResponse = response;
        const regex = new RegExp(`^https?:\\/\\/(?:[\\w_-]+\\.)*${horse.replaceAll(".", "\\.")}(?:$|\\/)`);
        if (response.redirected && response.url.match(regex) === null) {
          binAdjust(horse, "redirects");
          console.log("Verdict: Redirect");
          return;
        } else if (response.ok) {
          return response.text();
        } else {
          binAdjust(horse, "registered");
          console.log("Verdict: Registered but IP-less");
          return;
        }
      }).then((text) => {
        if (text && text !== "") {
          document = parseHTML(text);
          const url = new URL(fetchResponse.url);
          if (text.includes(`<script>window.onload=function(){window.location.href="/lander"}</script>`)
          || (url.pathname === "/lander" && document.querySelector(`body > div#root:empty`))) { //blank
            binAdjust(horse, "blank");
            console.log("Verdict: Blank");
          } else {
            binAdjust(horse, "actual");
            console.log("Verdict: Actual");
          }
          return;
        } else if (text === "") {
          binAdjust(horse, "blank");
          console.log("Verdict: Blank");
          return;
        }
      }).catch((e) => {
        binAdjust(horse, "registered");
        console.log("Verdict: Registered but IP-less");
      });
    } catch (e) {
      binAdjust(horse, "registered");
      console.log("Verdict: Registered but IP-less");
    }
  } catch (err) {
    console.error(err);
  }
};

const tasks = {
  fetchHorseList: new AsyncTask("fetch horselist", fetchHorseList),
  horseRotate: new Task("horse rotate", horseRotate)
};
const jobs = {
  fetchHorseList: new SimpleIntervalJob({ seconds: 60 * 60 * 24, }, tasks.fetchHorseList), //24h
  horseRotate: new SimpleIntervalJob({ seconds: 60 * 5, }, tasks.horseRotate) //5m
};

const restoreProgress = () => {
  if (!fs.existsSync(horseListProgressFile))
    fs.writeFileSync(horseListProgressFile, `${progress}`);
  else
    progress = +fs.readFileSync(horseListProgressFile);
  
  if (fs.existsSync(actualHorseFilepath))
    horseBins.actual = new Set(JSON.parse(fs.readFileSync(actualHorseFilepath)));
  if (fs.existsSync(registeredHorseFilepath))
    horseBins.registered = new Set(JSON.parse(fs.readFileSync(registeredHorseFilepath)));
  if (fs.existsSync(redirectsHorseFilepath))
    horseBins.redirects = new Set(JSON.parse(fs.readFileSync(redirectsHorseFilepath)));
  if (fs.existsSync(blankHorseFilepath))
    horseBins.blank = new Set(JSON.parse(fs.readFileSync(blankHorseFilepath)));
};

const main = async () => {
  restoreProgress();
  await fetchHorseList();
  for (const job in jobs)
    scheduler.addSimpleIntervalJob(jobs[job]);
  await horseRotate();
};

if (require.main === module)
  main();

/*
fetch horselist from every.horse IF /data/every_horse.json is empty or doesn't exist
start every.horse daily pull
  write to /data/every_horse.json
start horselist rotate pull
  go to .horse website based on index
  determine it to be one of five things
  put the domain into categorical json files based on what it was determined to be

*/