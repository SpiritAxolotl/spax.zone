var d;

var SpaxTime;
var MathewTime;
var CalmTime;
var minutes;
var final;
var final1;
var final2;
var final3;

var updateInterval;

window.onload = () => {
    updateInterval = setInterval(run, 16.67);
};

function run() {
    upDate();
    final1 = toTimezone(SpaxTime);
    final2 = toTimezone(MathewTime);
    final3 = toTimezone(CalmTime);
    updateText();
}

function upDate(){
    d = new Date();
    
    SpaxTime   = d.getUTCHours()-7;
    MathewTime = d.getUTCHours()+2;
    CalmTime   = d.getUTCHours()+8;
    minutes    = d.getUTCMinutes();
}

function toTimezone(hour){
    //adds a zero if the minutes section is 1 digit long (so "1:01" instead of "1:1")
    if (minutes>=0 && minutes<10)
        minutes="0"+minutes;
    
    //makes sure that the time is always positive if it's not between 0 and 23
    hour%=24;
    
    //decides the AM/PM stuff
    //12 AM
    if (hour==0)
        final=12+":"+minutes+" AM";
    //12 PM
    else if (hour==12)
        final=hour+":"+minutes+" PM";
    //rest of AM
    else if (hour<12)
        final=hour+":"+minutes+" AM";
    //rest of PM
    else if (hour>12)
        final=(hour-12)+":"+minutes+" PM";
    else
        final="error! something went wrong.";
    
    return final;
}

function updateText() {
    document.getElementById("date1").innerHTML = "Spax's current time is "+final1+"! He's in UTC-7 (MST).";
    document.getElementById("date2").innerHTML = "Mathew's current time is "+final2+"! He's in UTC+2 (EET).";
    document.getElementById("date3").innerHTML = "Calm's current time is "+final3+"! He's in UTC+8 (PHST).";
}
