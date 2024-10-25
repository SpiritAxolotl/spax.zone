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
  const horseLinks = await readJSONFile("/data/every_horse.json");
  const horseLinksLength = horseLinks.length;
  const visiting = document.querySelector(`#visiting`);
  const random = (arr) => {
    return Math.floor(Math.random()*arr.length);
  };
  let horseDomain = "";
  const genNextHorseLink = () => {
    const randomIndex = random(horseLinks);
    horseDomain = horseLinks.splice(randomIndex, 1)[0];
    visiting.innerHTML = `About to visit <code>${horseDomain}</code>...`;
  };
  genNextHorseLink();
  document.querySelector(`#horsebutton`).addEventListener("click", async () => {
    if (!horseLinks.length)
      return alert(`Congrats! You went to all ${horseLinksLength} .horse links! We are proud of you!! 🐴`);
    console.log(horseDomain);
    //const protocol = await checkProtocol(horseDomain);
    const win = window.open(`http://${horseDomain}`, "_blank");
    win.focus();
    genNextHorseLink();
  });
};

main();