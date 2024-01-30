let d;

let SpaxTime;
let MathewTime;
let CalmTime;
let minutes=0;
let final=[];
let text=[];

function requestUpdate() {
  requestAnimationFrame(update.bind(this));
}

function update() {
  upDate();
  final=[
    toTimezone(SpaxTime),
    toTimezone(MathewTime),
    toTimezone(CalmTime)
  ];
  
  // updateText
  for (let i = 0; i < text.length; i++) text[i].textContent = final[i];
  
  requestUpdate();
}

function upDate(){
  d = new Date();
  
  SpaxTime   = d.getUTCHours()-7;
  MathewTime = d.getUTCHours()+2;
  CalmTime   = d.getUTCHours()+8;
  minutes  = d.getUTCMinutes();
}

function toTimezone(hour){
  let mins=minutes;
  //adds a zero if the minutes section is 1 digit long (so "1:01" instead of "1:1")
  if (minutes>=0 && minutes<10) mins=`0${minutes}`;
  
  //makes sure that the time is always positive
  hour=Math.abs(hour);
  
  //decides the AM/PM stuff
  let mmmmm = hour < 12 ? "AM" : "PM";
  
  return `${hour-(+(hour>12)*12)+(+(hour===0)*12)}:${mins} ${mmmmm}`;
}

window.addEventListener("load", () => {
  let texts=document.querySelectorAll(".date");
  text = [
    document.createElement("span"),
    document.createElement("span"),
    document.createElement("span")
  ];
  
  texts[0].append("Spax's current time is ", text[0], "! He's in UTC-7 (MST).");
  texts[1].append("Mathew's current time is ", text[1], "! He's in UTC+2 (EET).");
  texts[2].append("Calm's current time is ", text[2], "! He's in UTC+8 (PHST).");
  
  requestUpdate();
});
