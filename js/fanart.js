window.onload = () => {
  Fanart.load();
};

function Fanart () {
  ThrowError(1);
}

Fanart.load = function () {
  let request = new XMLHttpRequest(); //this should get changed at some point. I'm 75% sure it's deprecated
  
  request.onload = () => {
    if (request.status < 400) {
      this.fanartData = JSON.parse(request.responseText);
      this.setData();
    }
  };
  
  request.onerror = () => {
    ThrowError(3);
  };
  
  if (window.location.href.match(/(?<=\/)nahua-ref-sheet(\.html)?$/))
    request.open("GET", "/data/nahua-refs.json");
  else
    request.open("GET", "/data/fanart.json");
  request.overrideMimeType("application/json");
  request.send();
};

Fanart.setData = function () {
  this.mainContent = document.querySelector("#bg");
  
  for (let fanart of this.fanartData) {
    let output = document.createElement("div");
    let credit = fanart.credit;
    let desc = "";
    
    output.classList.add("fart-text-box", "unselectable");
    
    if (!fanart.visible) output.style.display = "none";
    
    if (fanart.link !== null) credit = `<a href="${fanart.link}" target="_blank">${fanart.credit}</a>`;
    
    if (fanart.desc !== null) desc = `<br>${fanart.desc}`;
    
    let innerContent = document.createElement("div");
    
    innerContent.innerHTML = `${fanart.content}<br>${fanart.type} by ${credit}${desc}`;
    
    output.append(innerContent);
    this.mainContent.append(output);
    
  }
  
  let lastBox = document.createElement("div");
  
  lastBox.classList.add("text-box", "flex-container", "unselectable");
  lastBox.innerHTML = `<div>(<a href="/html/main">Click here</a> to go back to the main page!)</div>`;
  
  while (document.getElementsByClassName("end-of-fanart").length > document.getElementsByClassName("moved").length) {
    let element = document.getElementsByClassName("end-of-fanart")[0];
    if (!element.classList.contains("moved")) {
      element.classList.add("moved");
      this.mainContent.append(element);
    }
  }
  this.mainContent.append(lastBox);
};
