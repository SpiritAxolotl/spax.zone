const fs = require("fs");
const { ToadScheduler, SimpleIntervalJob, Task, AsyncTask } = require("toad-scheduler");
const { parseHTML } = require("linkedom");

//progress represented by [0-1) so the general order is maintained when new sites are added
let progress = 0;
const scheduler = new ToadScheduler();
const dataDirectory = `./data`;
const horseProgressFile = `${dataDirectory}/horseProgress.txt`;
const repoLink = "https://spax.zone/repo/tests/horse";
const everyHorseLink = "https://every.horse/horse.json";
const everyHorseBackupFile = `${dataDirectory}/every_horse.json`;
/**
 * WILL NOT HAVE .horse AFTER EVERY LINK
 */
let horseList = ["every"];

const horseDataFilepath = `${dataDirectory}/horse_data.json`;

let horseData = {};
let sortedHorseDataKeys = [];
const defaultHorseDomainData = { status: "unvisited" };

const createAnsiHyperlink = (url, text) => {
  return `\u001b]8;;${url}\u001b\\${text}\u001b]8;;\u001b\\`;
};

const getHTMLFile = async (link, local, ua) => {
  let userAgent = repoLink;
  if (ua) userAgent = `${ua} (${repoLink})`;
  try {
    const headers = new Headers({
      "Accept": "text/html",
      "Content-Type": "text/html",
      "User-Agent": userAgent
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
      "User-Agent": `Spax's Daily Horselist Fetch (${repoLink})`
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
const sortHorseList = (list=[]) => {
  return list.toSorted((a, b) => {
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
};

const incrementProgress = () => {
  const len = sortedHorseDataKeys.length;
  let p = Math.round(progress * len);
  while (sortedHorseDataKeys[p].status === "dead" && !horseList.includes(sortedHorseDataKeys[p]))
    p++; //skip dead horses
  progress = ((p+1)%len)/len;
  fs.writeFileSync(horseProgressFile, `${progress}`);
  return p;
};

/*const parseHorseListSite = (document) => {
  let list = [];
  const stats = document.querySelector(`main.page-content div.wrapper div.home p:nth-of-type(2)`).textContent
    .match(/There are currently (\d+) horse domains. \(Last checked at: (\d{1,2} [A-Z][a-z]*, \d{1,})\)/);
  list = Array.from(document.querySelectorAll(`#the-list + p > a`))
    .map(a => a.textContent.match(/[\w_-]+(?:\.[\w_-]+){0,}/)[0]);
  list.splice(list.findIndex(e=>e==="horse"), 1);
  return list;
};*/

const getHorseFromList = (n) => {
  return `${horseList[n]}.horse`;
};

const fetchHorseList = async () => {
  if (horseList.length > 1)
    console.log("Starting daily fetch of the horselist from every.horse/horse.json...");
  else
    console.log("Fetching horselist from every.horse/horse.json...");
  const horseDomainRegex = /((?:[\w_-]+\.)*[\w_-]+)(?=\.horse)/;
  let originalHorseList = [...horseList];
  try {
    originalHorseList = await getJSONFile(everyHorseLink);
    fs.writeFileSync(everyHorseBackupFile, JSON.stringify(sortHorseList(originalHorseList)));
    console.log("Horselist retreived!\n");
  } catch (err) {
    console.log("Unable to get new horselist. Here's the error:");
    console.error(err);
    if (!fs.existsSync(everyHorseBackupFile)) {
      console.log("Attempting to use backup file...");
      horseList = JSON.parse(fs.readFileSync(everyHorseBackupFile));
      console.log("Backup file used!\n");
    } else return false;
  }
  horseList = originalHorseList
    .filter(e=>e.match(horseDomainRegex)) //filters to those that will match the next regex
    .map(e=>e.match(horseDomainRegex)[0]); //removes the .horse
  horseList = sortHorseList(horseList);
  for (const horseSLD of horseList)
    horseData[horseSLD] ??= {...defaultHorseDomainData};
  sortedHorseDataKeys = sortHorseList(Object.keys(horseData));
  fs.writeFileSync(`./${horseDataFilepath}`, JSON.stringify(horseData));
  return true;
};

const horseRotate = async (params={sld:"", firstRun:false}) => {
  let p = 0;
  
  const horseUpdate = (status="", updates={}) => {
    horseData[horseList[p]] ??= {};
    const targetHorse = horseData[horseList[p]];
    targetHorse.status = status;
    delete targetHorse.redirect;
    if (status !== "dead") targetHorse.lastVisited = new Date();
    let consoleStatus = status.substring(0,1).toUpperCase() + status.substring(1);
    switch (status) {
      case "redirect":
        targetHorse.redirect = updates.redirect;
        break;
      case "registered":
        consoleStatus += " but IP-less";
        break;
      case "dead":
        consoleStatus += " 💀";
        break;
    }
    
    fs.writeFileSync(`./${horseDataFilepath}`, JSON.stringify(horseData));
    console.log(`Verdict: ${consoleStatus}\n`);
  };
  
  const specifiedDomain = typeof params.sld === "string" && params.sld.length > 0;
  if (!specifiedDomain || params.firstRun) {
    console.log(`Current progress: ${(progress * 100).toFixed(4)}%`);
    p = incrementProgress();
  }
  const horse = specifiedDomain ? `${params.sld}.horse` : getHorseFromList(p);
  console.log(`Current date and time: ${(new Date()).toString()}`);
  console.log("Current horse domain:", /*createAnsiHyperlink(`http://${horse}`, horse),*/ horse);
  
  let document = undefined;
  let fetchResponse = new Response();
  try {
    const headers = new Headers({
      "Accept": "text/html",
      "Content-Type": "text/html",
      "User-Agent": `Spax's Periodic Horse Domain Check-Up (${repoLink})`
    });
    
    await fetch(`http://${horse}`, {
      method: "GET",
      headers: headers
    }).then((response) => {
      fetchResponse = response;
      const regex = new RegExp(`^https?:\\/\\/(?:[\\w_-]+\\.)*${horse.replaceAll(".", "\\.")}(?:$|\\/)`);
      if (response.redirected && response.url.match(regex) === null) {
        horseUpdate({status:"redirect", redirect: response.url});
        return;
      } else if (response.ok) {
        return response.text();
      } else {
        horseUpdate("registered");
        return;
      }
    }).then((text) => {
      if (text && text !== "") {
        document = parseHTML(text);
        const url = new URL(fetchResponse.url);
        if (text.includes(`<script>window.onload=function(){window.location.href="/lander"}</script>`)
        || (url.pathname === "/lander" && document.querySelector(`body > div#root:empty`))) { //blank
          horseUpdate("blank");
        } else {
          horseUpdate("actual");
        }
        return;
      } else if (text === "") {
        horseUpdate("blank");
        return;
      }
    }).catch((e) => {
      horseUpdate("registered");
    });
  } catch (err) {
    console.error(err);
  }
};

const tasks = {
  fetchHorseList: new AsyncTask("fetch horselist", fetchHorseList),
  horseRotate: new Task("horse rotate", horseRotate)
};
const jobs = {
  fetchHorseList: new SimpleIntervalJob({ days: 1 }, tasks.fetchHorseList),
  horseRotate: new SimpleIntervalJob({ minutes: 5, runImmediately: true }, tasks.horseRotate)
};

const restoreProgress = () => {
  if (!fs.existsSync(horseProgressFile))
    fs.writeFileSync(horseProgressFile, `${progress}`);
  else {
    const progressText = fs.readFileSync(horseProgressFile);
    if (progressText.includes("new")) {
      return true;
    } else if (typeof (+progressText) === "number" && !isNaN(+progressText)) {
      progress = +progressText;
    }
  }
  
  if (fs.existsSync(horseDataFilepath))
    horseData = JSON.parse(fs.readFileSync(horseDataFilepath));
  return false;
};

const getUnvisitedHorses = () => {
  return sortedHorseDataKeys.filter(horse=>horseData[horse].status === "unvisited");
};

const main = async () => {
  let firstRun = restoreProgress();
  const success = await fetchHorseList();
  const unvisitedHorses = getUnvisitedHorses();
  if (success) {
    if (firstRun || unvisitedHorses.length > 0) {
      if (firstRun)
        console.log("First run detected! Removing the rotation cooldown...\n");
      else if (unvisitedHorses.length > 0)
        console.log(`New site${unvisitedHorses.length>1?"s":""} added to the list! Quickly visiting...\n`);
      while (unvisitedHorses.length > 0) {
        await horseRotate({
          sld: unvisitedHorses.shift(),
          firstRun: firstRun
        });
      }
      console.log("Unvisited sites have all been visited! Starting normal rotation...\n");
    }
    for (const job in jobs) {
      scheduler.addSimpleIntervalJob(jobs[job]);
    }
  } else {
    console.log("Unable to fetch the horse list. Terminating program...");
  }
};

if (require.main === module)
  main();