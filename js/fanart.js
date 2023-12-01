window.onload = () => {
  Fanart.load();
};

function Fanart () {
  ThrowError(1);
}

Fanart.load = function () {
  let request = new XMLHttpRequest();
  
  request.onload = () => {
    if (request.status < 400) {
      this.fanartData = JSON.parse(request.responseText);
      this.setData();
    }
  };
  
  request.onerror = () => {
    ThrowError(3);
  };
  
  request.open("GET", "/data/fanart.json");
  request.overrideMimeType("application/json");
  request.send();
};

Fanart.setData = function () {
  this.mainContent = document.querySelector("#bg");
  
  for (let i = 0; i < this.fanartData.length; i++) {
    let output = document.createElement("div");
    var credit = this.fanartData[i].credit;
    var desc = "";
    
    output.classList.add("fart-text-box", "unselectable");
    
    if (!this.fanartData[i].visible) output.style.display = "none";
    
    if (this.fanartData[i].link != null) credit = `<a href="${this.fanartData[i].link}" target="_blank">${this.fanartData[i].credit}</a>`;
    
    if (this.fanartData[i].desc != null) desc = `<br>${this.fanartData[i].desc}`;
    
    let innerContent = document.createElement("div");
    
    innerContent.innerHTML = `${this.fanartData[i].content}<br>${this.fanartData[i].type} by ${credit}${desc}`;
    
    output.append(innerContent);
    this.mainContent.append(output);
  }
  
  let lastBox = document.createElement("div");
  
  lastBox.classList.add("text-box flex-container unselectable");
  lastBox.innerHTML = `<div>(<a href="/html/main">Click here</a> to go back to the main page!)</div>`;
  
  this.mainContent.append(lastBox);
};
