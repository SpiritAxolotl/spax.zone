var d;

var SpaxTime;
var MathewTime;
var CalmTime;
var minutes;

var updateInterval;

window.onload = () => {
    updateInterval = setInterval(run, 16.67);
};

function upDate(){
    d = new Date();
    
    SpaxTime   = d.getUTCHours()-7;
    MathewTime = d.getUTCHours()+2;
    CalmTime   = d.getUTCHours()+8;
    minutes    = d.getUTCMinutes();
}

function toTimezone(Hour){
    if (minutes >= 0 && minutes < 10) {
        minutes = "0", minutes; }
    Hour = Hour % 24;
    
    if (Hour == 12 ) {
        Hour = Hour, ":", minutes, " PM" ;
    } else if (Hour == 24) {
        Hour = Hour, ":", minutes, " AM" ;
    } else { if (Hour > 12) {
        Hour = Hour-12 , ":" , minutes , " PM";
    } else { Hour = Hour, ":", minutes , " AM";
           }
    }
}

function run() {
    upDate();
    toTimezone(SpaxTime);
    toTimezone(MathewTime);
    toTimezone(CalmTime);
    updateText();
}

function updateText () {
    document.getElementById("date1").innerHTML = "Spax's current time is "+SpaxTime+"! He's in UTC-7 (MST).";
    document.getElementById("date2").innerHTML = "Mathew's current time is "+MathewTime+"! He's in UTC+2 (EET).";
    document.getElementById("date3").innerHTML = "Calm's current time is "+CalmTime+"! He's in UTC+8 (PHST).";
}


