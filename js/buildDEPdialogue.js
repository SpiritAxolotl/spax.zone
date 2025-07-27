const fs = require('fs');
const { readPage } = require('./utils.js');
const { Timer } = require('./timer.js');

const targetPage = "./DEPalldialogue.html";
const eventDump = "./data/dep_event_dump.json";

const allDialogue = {};
let persistThread = false;

const getDEPEventDump = (callback) => {
  if (!fs.existsSync(eventDump)) {
    return fetch("https://cdn.spax.zone/dep_event_dump.json")
      .then(a => a.json())
      .then(data => callback(null, data))
      .catch(err => callback(err,  null));
  }
  fs.readFile(eventDump, "utf8", (err, data) => {
    if (err)
      return callback(err, null);
    return callback(null, JSON.parse(data));
  });
};

const main = () => {
  const wholeTimer = new Timer("building the dialogue", false);
  getDEPEventDump(async (err, data) => {
    if (err) throw err;
    const timer = new Timer("parsing dialogue JSON");
    for (const file of Object.keys(data)) {
      for (const dataIterator of data[file]) {
        const info = {
          file: file,
          name: dataIterator.image?.characterName ?? "Common"
        };
        if (dataIterator.list) processDialogue(dataIterator.list, info);
        else if (dataIterator.pages) {
          for (const pagesIterator of dataIterator.pages) {
            if (stringHasLength(pagesIterator.image?.characterName))
              info.name = pagesIterator.image.characterName.replace(/[\W\-]+/, "");
            if (pagesIterator.list)
              processDialogue(pagesIterator.list, info);
          }
        } else continue;
      }
    }
    timer.stop("parse dialogue JSON");
    removeDuplicateThreads();
    //await applyOverrides(true);
    fs.writeFileSync("./data/dep_dialogue_dump.json", JSON.stringify(allDialogue));
    const { document } = await readPage(targetPage);
    fs.writeFileSync(targetPage, buildHTML(document));
    wholeTimer.stop("build the dialogue");
  });
};

const stringHasLength = (str) => {
  return typeof str === "string" && str.length;
}

const endOfThreadCodes = new Set([121, 122, 402, 404]);
const isEndOfDialogue = (codelist) => {
  const len = codelist.length-1;
  if (endOfThreadCodes.has(codelist[len]))
    return true;
  if (codelist[len] === 411 && codelist[len-1] === 0)
    return true;
  return false;
};

const processDialogue = (list, info) => {
  const dialogue = {
    who: "",
    emotion: "",
    text: [],
    type: "normal"
  };
  const codelist = [];
  for (const listIterator of list) {
    const code = listIterator.code;
    codelist.push(code);
    const params = listIterator.parameters;
    if (code === 401) { //dialogue
      pushTextbox(dialogue, info, {overflow: true});
      dialogue.text.push(
        params[0]
          .replaceAll(/\\SE\[\d+\]/g, "") //sound effect cues
          .replaceAll(/\\\./g, "") //short pause cues
          .replaceAll(/\\[^\{\}]/g, "") //anything else that's escaped (single characters)
      );
    } else if (code === 101) { //face
      pushTextbox(dialogue, info);
      const match = params[0].match(/^(\w+?)(?:_(?:Portrait_)?(?:test_)?([\w_]+?))?$/i);
      if (match) {
        if (match[1])
          dialogue.who = match[1].toLowerCase();
        if (match[2])
          dialogue.emotion = match[2].toLowerCase();
      }
    } else if (code === 102) { //options
      pushTextbox(dialogue, info);
      dialogue.type = "picker";
      dialogue.text.push(...params[0]);
      if (params[3] === 0)
        dialogue.align = "start";
      else if (params[3] === 2)
        dialogue.align = "end";
    } else if (isEndOfDialogue(codelist)) {
      pushTextbox(dialogue, info, {bump: true});
    }
  }
  pushTextbox(dialogue, info, {bump: true});
};

const correctInconsistencies = (dialogue) => {
  //for 600_portrait_test_Enlarged which is just yoki
  if (dialogue.who === "600") {
    dialogue.who = "yoki";
    dialogue.emotion = "neutral";
  } else if (dialogue.who === "youngyoki") {
    dialogue.who = "youngeryoki";
  } else if (dialogue.who === "claire" && dialogue.emotion === "down") {
    dialogue.emotion = "sad";
  } else if (dialogue.who === "este" && dialogue.emotion === "portrait") {
    dialogue.emotion = "stare";
  } else if (dialogue.who === "charles" && dialogue.emotion === "downlook") {
    dialogue.emotion = "look_down";
  } else if (dialogue.who === "tem" && dialogue.emotion === "down") {
    dialogue.emotion = "look_down";
  } else if (dialogue.who === "hero") {
    dialogue.who = dialogue.emotion;
    dialogue.emotion = "";
  }
};

const pushTextbox = (dialogue, info, options={overflow: false, bump: false}) => {
  allDialogue[info.file] ??= {};
  const file = allDialogue[info.file];
  file[info.name] ??= [];
  const characterName = file[info.name];
  let currentThread = characterName.length;
  if (persistThread)
    currentThread = characterName.length - 1;
  const length = dialogue.text.length;
  if ((options.overflow && length >= 4) || (!options.overflow && length > 0)) {
    persistThread = true;
    characterName[currentThread] ??= [];
    const thread = characterName[currentThread];
    correctInconsistencies(dialogue);
    if (dialogue.type === "picker")
      characterName[currentThread].splice(characterName[currentThread].length-1, 0, {...dialogue});
    else
      thread.push({...dialogue});
    if (!options.overflow) {
      dialogue.who = "";
      dialogue.emotion = "";
    }
    dialogue.text = [];
    dialogue.type = "normal";
    if (options.bump)
      persistThread = false;
  }
};

const removingHelper = (threadi, file, characterName, i) => {
  for (let j=i+1; j<allDialogue[file][characterName].length; j++) {
    const threadj = allDialogue[file][characterName][j];
    if (threadi.length === threadj.length) {
      let isDuplicate = true;
      for (let k=0; k<threadi.length; k++) {
        if (!textboxEquals(threadi[k], threadj[k])) {
          isDuplicate = false;
          break;
        }
      }
      if (isDuplicate) {
        allDialogue[file][characterName].splice(j, 1);
        j--;
      }
    }
  }
};

const removeDuplicateThreads = () => {
  const timer = new Timer("Removing duplicates");
  for (const file of Object.keys(allDialogue)) {
    for (const characterName of Object.keys(allDialogue[file])) {
      for (let i=0; i<allDialogue[file][characterName].length; i++) {
        const threadi = allDialogue[file][characterName][i];
        removingHelper(threadi, file, characterName, i);
        if (allDialogue[file]["Common"] && characterName !== "Common")
          removingHelper(threadi, file, "Common", -1);
      }
    }
  }
  timer.stop("remove duplicates");
};

const applyOverrides = async (duplicatesRemoved=false) => {
  const overrides = await (async () => {
    try {
      const data = await fs.promises.readFile("./data/dep_dialogue_overrides.json", "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading file:", err);
      throw err;
    }
  })();
  const timer = new Timer("applying overrides");
  //this needs to be rewritten for allDialogue now being an any[][]
  for (let i=0; i<allDialogue.length; i++) {
    const dialogue = allDialogue[i];
    for (let j=0; j<overrides.length; j++) {
      const override = overrides[j];
      if (textboxEquals(override, dialogue)) {
        for (const replace of override.replace)
          override.text[replace.index] = (override.text[replace.index] ?? "").replace(replace.target, replace.new);
        override.override = true;
        delete override.replace;
        allDialogue[i].typo = true;
        allDialogue.splice(++i, 0, override);
        if (duplicatesRemoved) {
          overrides.splice(j, 1);
          j--;
        }
      }
    }
  }
  timer.stop("apply overrides");
};

const escapeHTML = (unsafe) => {
  return unsafe
    .replaceAll(`&`, "&amp;")
    .replaceAll(`<`, "&lt;")
    .replaceAll(`>`, "&gt;")
    .replaceAll(`"`, "&quot;")
    .replaceAll(`'`, "&#039;");
};
const escapeHTMLString = (unsafe) => {
  return unsafe.replaceAll(/"|\s/g, "");
};

const clearArea = (document) => {
  const timer = new Timer("clearing the area");
  //document.querySelectorAll(`#buildbelowme ~ :not(#buildaboveme):not(#buildaboveme ~ *)`)
  //  .forEach(e=>e.remove());
  document.body.innerHTML = document.body.innerHTML
    .replace(/(?<=<div id="buildbelowme"><\/div>)[\s\S]*(?=<div id="buildaboveme"><\/div>)/, "\n  ");
  timer.stop("clear the area");
};

const buildHTML = (document) => {
  document.body.innerHTML = "";
  const timer = new Timer("building HTML");
  for (const file of Object.keys(allDialogue)) {
    for (const characterName of Object.keys(allDialogue[file])) {
      for (let i=0; i<allDialogue[file][characterName].length; i++) {
        const thread = allDialogue[file][characterName][i];
        const threadsection = document.createElement("section");
        const characterNameBetter = characterName[0].toUpperCase() + characterName.substring(1);
        let id = `${file}-${characterNameBetter}`;
        if (allDialogue[file][characterName].length > 1)
          id += `-${i+1}`;
        threadsection.id = id;
        for (let j=0; j<thread.length; j++) {
          const dialogue = thread[j];
          const article = document.createElement("article");
          if (dialogue.who)
            article.setAttribute("who", dialogue.who);
          if (dialogue.emotion)
            article.setAttribute("emotion", dialogue.emotion);
          if (dialogue.align)
            article.classList.add(dialogue.align);
          if (dialogue.type !== "normal")
            article.classList.add(dialogue.type);
          article.id = `${id}-${j+1}`;
          for (let k=0; k<dialogue.text.length; k++) {
            const line = dialogue.text[k];
            if (dialogue.type === "picker") {
              const linespan = document.createElement("span");
              article.appendChild(linespan);
              linespan.classList.add("line");
              linespan.classList.add("highlight");
              linespan.textContent += line;
              if (i < dialogue.text.length-1)
                linespan.textContent += " ";
              article.appendChild(document.createElement("br"));
            } else {
              const linespan = document.createElement("span");
              linespan.classList.add("line");
              article.appendChild(linespan);
              linespan.textContent += line;
              if (k < dialogue.text.length-1) {
                if (!dialogue.text[k].match(/\s+$/))
                  linespan.textContent += " ";
                const brspan = document.createElement("span");
                brspan.classList.add("break");
                if (line.match(/[^\w\s]\s*$/g)) //ends in punctuation
                  brspan.classList.add("end");
                article.appendChild(brspan);
              }
            }
          }
          //this is the only bit of code that's still really confusing.
          //it just makes the text red if it has "\{" and stops it at the end or at "\}"
          //if there's a clean way to do it in linkedom I'd love to hear it
          article.innerHTML = article.innerHTML.replace(/\\\{([\s\S]+?)(?:\\\}|$)/, `<span class="red">$1</span>`);
          threadsection.appendChild(article);
        }
        document.body.appendChild(threadsection);
        threadsection.insertAdjacentHTML("beforebegin", "\n  ");
      }
    }
  }
  document.body.insertAdjacentHTML("beforeend", "\n");
  timer.stop("build HTML");
  return document.toString();
};

/* utils */

const textboxEquals = (a,b) => {
  if (typeof (a.file * b.file) === "number" && a.file !== b.file)
    return false;
  if (a.who !== b.who || a.emotion !== b.emotion)
    return false;
  if (a.text.length !== b.text.length)
    return false;
  for (let i=0; i<a.text.length; i++)
    if (a.text[i] !== b.text[i])
      return false;
  return true;
};

if (require.main === module)
  main();

module.exports = { targetPage, clearArea, textboxEquals };