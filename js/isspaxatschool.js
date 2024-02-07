let debugTime;
updateTime();
setInterval(updateTime, 1000);

function updateTime() {
  const date = new Date(Date.now() - 3600000 * 7);
  const day = date.getUTCDay();
  const time = debugTime ?? date.getUTCHours()*60 + date.getUTCMinutes();
  const timeBox = document.getElementById("timeBox");
  const dateText = date.toUTCString();
  timeBox.innerHTML = dateText.substring(0, Math.max(0, dateText.length-4));
  const dateBox = document.getElementById("dateBox");
  dateBox.innerHTML = `<img src="/images/faces/spax/Smirk.png"></img>`;
  let output = "";
  //if during mon-thurs (school days)
  if (day >= 1 && day <= 4)
    //if time is between 7:30 and 2:25 (school hours)
    if (time >= 60*7+30 && time < 60*(12+2)+25)
      //if time is between 10:48 and 11:17 (lunch break)
      if (time >= 60*10+48)
        if (time < 60*11+17)
          //sets html for lunch
          output = `Yo! I'm currently in school, but it's also lunch right now. I may be online! But I'll be in class again in ${calcTimeUntil(time, 60*11+17)}.`;
        else
          //sets html for school (after lunch)
          output = `Yo! I'm currently in school! But I'll be out in ${calcTimeUntil(time, 60*(12+2)+25)}!`;
      else
        //sets html for school (before lunch)
        output = `Yo! I'm currently in school! But I'll be having lunch in ${calcTimeUntil(time, 60*10+48)}!`;
    //if time is between 12:00am and 6:15am
    else if (time >= 0 && time < 60*6+15)
      output = `Yo! I may not be in school, but I'm probably asleep. I'll be awake in about ${calcTimeUntil(time, 60*6+15)}!`;
    else if (time < 60*7+0)
      output = `Yo! I'm not in school, but I <i>will</i> be in about ${calcTimeUntil(time, 60*7+0)}. (I just woke up and am getting ready for or going to school.)`;
    else if (time < 60*7+30)
      output = `Yo! I'm <i>technically</i> in school right now, but it hasn't started yet (but it <i>will</i> in ${calcTimeUntil(time, 60*11+17)}.)`;
    else
      output = `Yo! I'm not in school right now!`;
  else if (day === 5)
    if (time >= 60*7+30 && time < 60*11+15)
      output = `Yo! I'm currently in school! But I'll be out in ${calcTimeUntil(time, 60*11+30)}!`;
    else if (time >= 60*9+30 || time < 60*5+30)
      output = `Yo! I may not be in school right now, but I'm probably asleep. I'll be awake in about ${calcTimeUntil(time, 60*6+15)}!`;
    else
      output = `Yo! I'm not in school right now!`;
  else if (day % 6 === 0)
    if (time >= 60*(12+7)+30 || time < 60*5+30)
      output = `Yo! I may not be in school right now (it's literally the weekend), but I'm probably asleep. I'll be awake in about ${calcTimeUntil(time, 60*5+30)}!`;
    else
      output = `Yo! I'm not in school! (It is literally the weekend.)`;
  dateBox.innerHTML += output;
}

function calcTimeUntil(currTime, endTime) {
  let output = "";
  const totalMinutes = (endTime - currTime + 1440) % 1440;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0)
    output += `${hours} hour${hours !== 1 ? "s" : ""}`;
  if (hours > 0 && minutes > 0)
    output += " and ";
  if (minutes > 0)
    output += `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  return output;
}
