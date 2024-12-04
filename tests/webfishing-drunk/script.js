let drunk_tier = 0;

const insert = (str1="", index=0, str2="") => {
  return str1.slice(0, index) + str2 + str1.slice(index);
};

const clamp = (min, val, max) => {
  return Math.max(min, Math.min(val, max));
};

const send_message = (text="", options={drunkness: drunk_tier, hiccing: true}) => {
  if (text.replaceAll(" ", "") === "") return "";
  text = text.replaceAll(/[\[\]]/g, "");
  
  options.drunkness ??= drunk_tier;
  options.drunkness = clamp(0, Math.round(options.drunkness), 4);
  options.hiccing ??= true;
  
  const breakdown = text.split(" ");
  let final_text = "";
  //let spoken_text = "";
  let colon = true;
  let current_effect = "none";
  
  //const drunk_chance = 0; //0.0?
  //const drunk_max = 0;
  
  //valid player instance stuff doesn't exist in this env
  const drunk_chance = 0.13 * options.drunkness;
  const drunk_max = options.drunkness;
  
  let line_index = 0;
  for (let line of breakdown) {
    if (line.startsWith("/")) {
      switch (line) {
        case "/me":
          colon = false;
        //case "/wag":
      }
    } else if (line.startsWith("[")) continue;
    else {
      //let spoken_add = line;
      for (let i=0; i<drunk_max; i++) {
        let cont = true;
        if (Math.random() < drunk_chance && line.length > 0) {
          const d_effect = Math.floor(Math.random() * 5);
          const slot = Math.floor(Math.random() * line.length)
          switch (d_effect) {
            case 2:
              line = insert(line, slot, "'");
              break;
            case 3:
              line = insert(line, slot, ",");
              break;
            case 4:
              if (options.hiccing) {
                line = insert(line, slot, " -*HICC*- ");
                cont = false;
                break;
              }
            default: //0, 1
              line = insert(line, slot, line.charAt(slot));
          }
        }
        if (!cont) break;
      }
      //spoken_text += spoken_add;
      
      final_text += line;
      if (breakdown.length-1 !== line_index) {
        //spoken_text += " ";
        final_text += " ";
      }
    }
    line_index += 1;
  }
  let prefix = "";
	let suffix = "";
	let endcap = ": ";
  if (!colon) {
    prefix = "(";
    suffix = ")";
    endcap = " ";
  }
  return final_text;
};

const title = document.querySelector(`#title`);
const drunkinput = document.querySelector(`#drunkinput`);
const drunkrange = document.querySelector(`#drunknessrange`);
const drunknumber = document.querySelector(`#drunknessnumber`);
const drunkinputlabel = document.querySelector(`label[for="drunkinput"]`);
const drunknesslabel = document.querySelector(`label[for="drunknessinput"]`);
//const drunkifybutton = document.querySelector(`#drunkify`);
const drunkoutput = document.querySelector(`#drunkoutput`);
const drunkoutputlabel = document.querySelector(`label[for="drunkoutput"]`);
const regen = document.querySelector(`#regen`);
const copy = document.querySelector(`#copy`);

const validDrunkThings = [title, drunkinputlabel, drunknesslabel, drunkoutputlabel, regen, copy];
const originalTexts = validDrunkThings.map(e=>e.textContent);

const updateOutput = (updateplaceholder=true) => {
  const output = send_message(drunkinput.value);
  if (output.length > 0)
    drunkoutput.textContent = output;
  else if (updateplaceholder)
    drunkoutput.placeholder = send_message(drunkinput.placeholder);
};

updateOutput(false);

const drunkifyAllText = () => {
  for (let i=0; i<validDrunkThings.length; i++)
    validDrunkThings[i].textContent = send_message(originalTexts[i], {hiccing: false});
};

drunkinput.addEventListener("input", updateOutput);

drunkrange.addEventListener("input", () => {
  const val = +drunkrange.value;
  if (!isNaN(val))
    drunk_tier = val;
  drunknumber.value = val;
  updateOutput();
  drunkifyAllText();
});
drunknumber.addEventListener("input", () => {
  if (+drunknumber.value > 4)
    drunknumber.value = 4;
  if (+drunknumber.value < 0)
    drunknumber.value = 0;
  if (+drunknumber.value % 1 !== 0)
    drunknumber.value = Math.round(+drunknumber.value);
  if (isNaN(+drunknumber.value))
    drunknumber.value = 0;
  const val = +drunknumber.value;
  if (!isNaN(val))
    drunk_tier = val;
  drunkrange.value = val;
  updateOutput();
  drunkifyAllText();
});

regen.addEventListener("click", () => {
  updateOutput();
});
copy.addEventListener("click", async () => {
  const text = drunkoutput.value;
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error(error.message);
  }
});