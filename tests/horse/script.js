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
  let horseLinks = await readJSONFile("/data/every_horse.json");
  let horseLinksLength = horseLinks.length;
  const visiting = document.querySelector(`#visiting`);
  document.querySelector(`#horsebutton`).addEventListener("click", async () => {
    if (!horseLinks.length)
      return alert(`Congrats! You went to all ${horseLinksLength} .horse links! We are proud of you!! 🐴`);
    const random = Math.floor(Math.random()*horseLinks.length);
    const horseDomain = horseLinks.splice(random, 1)[0];
    console.log(horseDomain);
    visiting.style.opacity = "1";
    visiting.innerHTML = `Visiting <code>${horseDomain}</code>...`;
    //const protocol = await checkProtocol(horseDomain);
    setTimeout(() => {
      const win = window.open(`http://${horseDomain}`, "_blank");
      win.focus();
      visiting.removeAttribute("style");
      visiting.innerHTML = `Visiting...`;
    }, 1000);
  });
};

main();