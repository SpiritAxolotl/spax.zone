let d = new Date();
let SpaxTime = [d.getUTCHours()-7,d.getUTCMinutes(),d.getUTCHours()+":"+d.getUTCMinutes()];
let PentaTime = [d.getUTCHours()+7,d.getUTCMinutes(),d.getUTCHours()+":"+d.getUTCMinutes()];
let SplitTime = [d.getUTCHours()-5,d.getUTCMinutes(),d.getUTCHours()+":"+d.getUTCMinutes()];

run();

setInterval(run(), 5000);

function run(){
upDate();
toTimezone(SpaxTime);
toTimezone(PentaTime);
toTimezone(SplitTime);
updateText();
}

function upDate(){
d = new Date();
}

function toTimezone(person){
    if (person[1]=="0"||person[1]=="1"||person[1]=="2"||person[1]=="3"||person[1]=="4"||person[1]=="5"||person[1]=="6"||person[1]=="7"||person[1]=="8"||person[1]=="9"){
        person[1]="0"+person[1]
    }
    if ((person[0]<0)||(person[0]>23)){
        person[0]=Math.abs(23-person[0])+1;
        if ((person[0])>13){
            person[2]=(person[0]-12)+":"+person[1]+" PM";
        } else {
            person[2]=person[0]+":"+person[1]+" AM";
        }
    } else {
        if ((person[0])>13){
            person[2]=(person[0]-12)+":"+person[1]+" PM";
        } else {
            person[2]=person[0]+":"+person[1]+" AM";
        }
    }
}

function updateText(){
document.getElementById("date1").innerHTML = "Spax's current time is "+SpaxTime[2]+"! They're in MST.";
document.getElementById("date2").innerHTML = "Pentaxel's current time is "+PentaTime[2]+"! He's in GMT+7.";
document.getElementById("date3").innerHTML = "Splittikin's current time is "+SplitTime[2]+"! She's in EST.";
}
