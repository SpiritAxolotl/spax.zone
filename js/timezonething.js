var d;

var SpaxTime;
var MathewTime;
var CalmTime;
var UTCTime;

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
    
    SpaxTime = [d.getUTCHours()-7,d.getUTCMinutes(),d.getUTCHours()+":"+d.getUTCMinutes()];
    MathewTime = [d.getUTCHours()+2,d.getUTCMinutes(),d.getUTCHours()+":"+d.getUTCMinutes()];
    CalmTime = [d.getUTCHours()+8,d.getUTCMinutes(),d.getUTCHours()+":"+d.getUTCMinutes()];
    UTCTime = [d.getUTCHours(),d.getUTCMinutes(),d.getUTCHours()+":"+d.getUTCMinutes()];
}

function toTimezone(person){
    if (person[1]=="0"||person[1]=="1"||person[1]=="2"||person[1]=="3"||person[1]=="4"||person[1]=="5"||person[1]=="6"||person[1]=="7"||person[1]=="8"||person[1]=="9"){
        person[1]="0"+person[1]
    }
    if (person[0]<1) {
        person[0]=24+person[0];
    } else if (person[0]>24) {
        person[0]=24-person[0];
    }
    if (person[0]==12) {
        person[2]=person[0]+":"+person[1]+" PM";
    } else if (person[0]==24) {
        person[2]=(person[0]-12)+":"+person[1]+" AM";
    } else {
        if ((person[0])>12) {
            person[2]=(person[0]-12)+":"+person[1]+" PM";
        } else {
            person[2]=person[0]+":"+person[1]+" AM";
        }
    }
}

function updateText () {
    document.getElementById("date1").innerHTML = "Spax's current time is "+SpaxTime[2]+"! He's in UTC-7 (MST).";
    document.getElementById("date2").innerHTML = "Mathew's current time is "+MathewTime[2]+"! He's in UTC+2 (EET).";
    document.getElementById("date3").innerHTML = "Calm's current time is "+CalmTime[2]+"! He's in UTC+8 (PHST).";
    //document.getElementById("date4").innerHTML = "UTC time is currently "+UTCTime[2]+".";
}
