const checkProtocol = async (domain) => {
  let https = false;
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*"
  });
  try {
    const httpsResponse = await fetch(`https://${domain}`, {
      method: "HEAD",
      headers: headers,
      mode: "cors",
      credentials: "omit"
    });
    if (httpsResponse.ok)
      https = true;
  } catch (error) {}
  
  if (https) return "https";
  return "http";
}

const readJSONFile = async (link) => {
  try {
    const response = await fetch(link);
    
    if (!response.ok)
      throw new Error(`Failed to fetch the file. Status: ${response.status}`);
    
    const json = await response.json();
    
    return json;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
};

const main = async () => {
  twemoji.parse(document.body, {
    folder: "svg",
    ext: ".svg"
  });
  const horseLinks = await readJSONFile("https://api.spax.zone/every_horse.json");
  const horseLinksLength = horseLinks.length;
  const visiting = document.querySelector(`#visiting`);
  const button = document.querySelector(`#horsebutton`);
  const whatThisIs = document.querySelector(`#whatthisis`);
  const random = (arr) => {
    return Math.floor(Math.random()*arr.length);
  };
  let horseDomain = "";
  const genNextHorseLink = () => {
    window.removeEventListener("focus", genNextHorseLink);
    const randomIndex = random(horseLinks);
    horseDomain = horseLinks.splice(randomIndex, 1)[0];
    visiting.innerHTML = `About to visit <code>${horseDomain}</code>...`;
  };
  genNextHorseLink();
  document.querySelector(`#whatisthis`).addEventListener("click", () => {
    whatThisIs.style["pointer-events"] = "all";
    whatThisIs.style["opacity"] = "1";
  });
  document.querySelector(`#closewhat`).addEventListener("click", () => {
    whatThisIs.style["pointer-events"] = "none";
    whatThisIs.style["opacity"] = "0";
  });
  button.addEventListener("click", () => {
    if (!horseLinks.length)
      return alert(`Congrats! You went to all ${horseLinksLength} .horse links! We are proud of you!! 🐴`);
    console.log(horseDomain);
    //const protocol = await checkProtocol(horseDomain);
    window.addEventListener("focus", genNextHorseLink);
    window.open(`http://${horseDomain}`, "_blank", "noopener"); //debating whether to have "noreferrer" too
  });
  button.removeAttribute(`disabled`);
};

main();

/*
settings that i would like to implement soon:
- toggle to save history across refreshes (will include the sites you have been to already in chronological order)
- ability to skip horse sites (with cooldown)
- filters for site types (and which to include)
- shitpost mode

also a reporting feature so blatantly malicious sites get blacklisted from the list

also maybe a disclaimer that The Horse Button is not a registered trademark and all uses of the trademark symbol are for satirical purposes only

also maybe a rating system to rate certain horse websites and determine the best one of them all

also for the backend maybe a periodic archive of the sites via web.archive.org? maybe initially if a new domain (with content) is detected and every 3 months otherwise. there's history in these sites!!
*/