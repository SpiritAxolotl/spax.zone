window.onload = () => {
    Fanart.load();
};

function Fanart ()
{
    ThrowError(1);
}

Fanart.load = function ()
{
    let request = new XMLHttpRequest();
    
    request.onload = () => {
        if (request.status < 400)
        {
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

Fanart.setData = function ()
{
    this.mainContent = document.querySelector("#bg");
    
    for (let i = 0; i < this.fanartData.length; i++)
    {
        var creditText = this.fanartData[i].credit;
        var descText = "";
        var styleText = "";
        
        if (!this.fanartData[i].visible)
        {
            styleText = ` style="display:none;"`;
        }
        
        if (this.fanartData[i].link != null)
        {
            creditText = `<a href="${this.fanartData[i].link}" target="_blank">${this.fanartData[i].credit}</a>`;
        }
        
        if (this.fanartData[i].desc != null)
        {
            descText = `<br>${this.fanartData[i].desc}`;
        }
        
        this.mainContent.innerHTML += `<div class="fart-text-box unselectable"${styleText}><div>${this.fanartData[i].content}<br>${this.fanartData[i].type} by ${creditText}${descText}</div></div>`;
        
        if (i == this.fanartData.length - 1)
        {
            this.mainContent.innerHTML += `<div class="text-box flex-container unselectable"><div>(<a href="/html/main">Click here</a> to go back to the main page!)</div></div>`;
        }
    }
};
