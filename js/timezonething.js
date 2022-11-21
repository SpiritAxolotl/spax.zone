var d;

var SpaxTime;
var MathewTime;
var CalmTime;
var minutes;

var updateInterval;

window.onload = () => {
    updateInterval = setInterval(run, 16.67);
};

function run() {
    upDate();
    toTimezone(SpaxTime);
    toTimezone(MathewTime);
    toTimezone(CalmTime);
    updateText();
}

function upDate(){
    d = new Date();
    
    SpaxTime   = d.getUTCHours()-7;
    MathewTime = d.getUTCHours()+2;
    CalmTime   = d.getUTCHours()+8;
    minutes    = d.getUTCMinutes();
}

function toTimezone(person){
    //adds a zero if the minutes section is 1 digit long (so "1:01" instead of "1:1")
    if (minutes>=0 && minutes<10)
        minutes="0"+minutes;
    
    //makes sure that the time is always positive if it's not between 1 and 24
    person%=24;
    
    //decides the AM/PM stuff
    if (person==12) {
        person=person+":"+minutes+" PM";
    } else if (person==24) {
        person=person-12+":"+minutes+" AM";
    } else {
        if (person>12) {
            person=person-12+":"+minutes+" PM";
        } else {
            person=person+":"+minutes+" AM";
        }
    }
}

function updateText () {
    document.getElementById("date1").innerHTML = "Spax's current time is "+SpaxTime+"! He's in UTC-7 (MST).";
    document.getElementById("date2").innerHTML = "Mathew's current time is "+MathewTime+"! He's in UTC+2 (EET).";
    document.getElementById("date3").innerHTML = "Calm's current time is "+CalmTime+"! He's in UTC+8 (PHST).";
}
