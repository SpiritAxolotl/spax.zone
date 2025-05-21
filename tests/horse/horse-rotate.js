const fs = require("fs");
const { ToadScheduler, SimpleIntervalJob, Task, AsyncTask } = require("toad-scheduler");
const { parseHTML } = require("linkedom");

//progress represented by [0-1) so the general order is maintained when new sites are added
let progress = 0;
const scheduler = new ToadScheduler();
const horseListProgressFile = `./data/horseListProgress.txt`;
let horseList = ["every.horse"];
const horseBins = {
  registered: new Set(), //as in JUST registered and no ip
  blank: new Set(),
  parked: new Set(),
  redirects: new Set(),
  actual: new Set()
};

const getHTMLFile = async (link, local, ua) => {
  try {
    const headers = new Headers({
      "Accept": "text/html",
      "Content-Type": "text/html",
      "User-Agent": `${ua?ua + " ":""}(https://spax.zone/repo/tests/horse)`
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
const sortHorseList = () => {
  horseList.sort((a, b) => {
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
  
  return horseList;
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
};

const fetchHorseList = async () => {
  console.log("Fetching horselist from every.horse...");
  const filepath = "data/every_horse.json";
  try {
    const data = await getHTMLFile("https://every.horse", "https://spax.zone/data/every.horse.html", "Spax's Periodic Horse Domain Check-Up");
    const { document } = parseHTML(data);
    const stats = document.querySelector(`main.page-content div.wrapper div.home p:nth-of-type(2)`).textContent
      .match(/There are currently (\d+) horse domains. \(Last checked at: (\d{1,2} [A-Z][a-z]*, \d{1,})\)/);
    horseList = Array.from(document.querySelectorAll(`#the-list + p > a`))
      .map(a => a.href.match(/(?<=https?:\/\/)[\w_-]+(?:\.[\w_-]+)*/)[0]);
    horseList.splice(horseList.findIndex(e=>e==="horse"), 1);
    sortHorseList();
    console.log("Horselist retreived!");
    fs.writeFileSync(`./${filepath}`, JSON.stringify(horseList));
  } catch (err) {
    console.log("Unable to get new horselist. Using old list... (Oh and here's the error)");
    console.error(err);
    horseList = getJSONFile(`https://spax.zone/${filepath}`);
  }
};

const horseRotate = async () => {
  console.log(`Current progress: ${(progress * 100).toFixed(3)}%`);
  const p = await incrementProgress();
  console.log("Current horse domain:", horseList[p]);
  
  let document = undefined;
  let responseStatus = -1;
  try {
    const headers = new Headers({
      "Accept": "text/html",
      "Content-Type": "text/html",
      "User-Agent": `Spax's Periodic Horse Domain Check-Up (https://spax.zone/repo/tests/horse)`
    });
    
    try {
      fetch(`http://${horseList[p]}`, {
        method: "GET",
        headers: headers
      }).then((response) => {
        responseStatus = response.status;
        if (response.ok) {
          return response.text();
        } else {
          binAdjust(horseList[p], "registered");
          return "";
        }
      }).then((text) => {
        if (text !== "") {
          document = parseHTML(text);
          binAdjust(horseList[p], "actual");
          console.log("Verdict: Actual");
        }
      }).catch((e) => {
        binAdjust(horseList[p], "registered");
        console.log("Verdict: Registered but IP-less");
      });
    } catch (e) {
      binAdjust(horseList[p], "registered");
      console.log("Verdict: Registered but IP-less");
    }
  } catch (err) {
    throw err;
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

if (!fs.existsSync(horseListProgressFile))
  fs.writeFileSync(horseListProgressFile, `${progress}`);

const main = async () => {
  await fetchHorseList();
  for (const job in jobs)
    scheduler.addSimpleIntervalJob(jobs[job]);
  //await horseRotate();
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