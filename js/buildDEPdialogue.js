const fs = require('fs');
const { JSDOM } = require('jsdom');
const { Timer } = require('./timer.js');

const targetPage = "./html/DEPalldialogue.html";
const eventDump = "./data/dep_event_dump.json";

let allDialogue = [];

const getDEPEventDump = (callback) => {
  if (!fs.existsSync(eventDump)) {
    return fetch("https://cdn.spax.zone/dep_event_dump.json")
      .then(a => a.json())
      .then(data => callback(null, data))
      .catch(err => callback(null, err));
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
        if (dataIterator.list) processDialogue(dataIterator.list, file);
        else if (dataIterator.pages)
          for (const pagesIterator of dataIterator.pages)
            if (pagesIterator.list)
              processDialogue(pagesIterator.list, file);
        else continue;
      }
    }
    timer.stop("parse dialogue JSON");
    removeDuplicates();
    await applyOverrides(true);
    fs.writeFileSync("./data/dep_dialogue_dump.json", JSON.stringify(allDialogue));
    const dom = await readPage(targetPage);
    fs.writeFileSync(targetPage, buildHTML(dom, dom.window.document));
    wholeTimer.stop("build the dialogue");
  });
};

const readPage = async (page) => {
  try {
    const html = await fs.promises.readFile(page, "utf8");
    const dom = new JSDOM(html);
    return dom;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

const processDialogue = (list, file) => {
  const dialogue = {
    who: "",
    emotion: "",
    text: [],
    type: "normal",
    file: file
  };
  for (const listIterator of list) {
    if (listIterator.code === 401) { //dialogue
      pushTextbox(dialogue, true);
      dialogue.text.push(
        listIterator.parameters[0]
          .replaceAll(/\\SE\[\d+\]/g, "") //sound effect cues
          .replaceAll(/\\\./g, "") //short pause cues
          .replaceAll(/\\[^\{\}]/g, "") //anything else that's escaped (single characters)
      );
    } else if (listIterator.code === 101) { //face
      pushTextbox(dialogue);
      const match = listIterator.parameters[0].match(/^(\w+?)(?:_(?:Portrait_)?(?:test_)?([\w_]+?))?$/i);
      if (match) {
        if (match[1])
          dialogue.who = match[1].toLowerCase();
        if (match[2])
          dialogue.emotion = match[2].toLowerCase();
      }
    } else if (listIterator.code === 102) { //options
      pushTextbox(dialogue);
      dialogue.type = "picker";
      dialogue.text.push(...listIterator.parameters[0]);
    //} else if (listIterator.code === 402) { //which branch
      //probably do something with IDs for this bit
    } else {
      pushTextbox(dialogue);
      continue;
    }
  }
};

const pushTextbox = (dialogue, overflow=false) => {
  const length = dialogue.text.length;
  if ((overflow && length >= 4) || (!overflow && length > 0)) {
    //for 600_portrait_test_Enlarged which is just yoki
    if (dialogue.who === "600") {
      dialogue.who = "yoki";
      dialogue.emotion = "neutral";
    } else if (dialogue.who === "youngyoki") {
      dialogue.who = "youngeryoki";
    }
    if (dialogue.type === "picker")
      allDialogue.splice(allDialogue.length-1, 0, {...dialogue});
    else
      allDialogue.push({...dialogue});
    if (!overflow) {
      dialogue.who = "";
      dialogue.emotion = "";
    }
    dialogue.text = [];
    dialogue.type = "normal";
    dialogue.file = -1;
  }
};

const removeDuplicates = () => {
  const timer = new Timer("Removing duplicates");
  const uniqueSet = new Set();
  allDialogue = allDialogue.filter(dialogue => {
    const stringified = JSON.stringify(dialogue);
    if (!uniqueSet.has(stringified)) {
      uniqueSet.add(stringified);
      return true;
    }
    return false;
  });
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
  document.querySelectorAll(`#buildbelowme ~ :not(#buildaboveme):not(#buildaboveme ~ *)`)
    .forEach(e=>e.remove());
  document.body.innerHTML = document.body.innerHTML
    .replace(/(?<=<div id="buildbelowme"><\/div>)\s+(?=<div id="buildaboveme"><\/div>)/, "\n  ");
  timer.stop("clear the area");
};

const buildHTML = (dom, document) => {
  clearArea(document);
  const timer = new Timer("building HTML");
  const buildaboveme = document.querySelector(`#buildaboveme`);
  for (const dialogue of allDialogue) {
    const article = document.createElement("article");
    if (dialogue.who)
      article.setAttribute("who", escapeHTMLString(dialogue.who));
    if (dialogue.emotion)
      article.setAttribute("emotion", escapeHTMLString(dialogue.emotion));
    if (dialogue.file !== -1)
      article.setAttribute("file", escapeHTMLString(dialogue.file));
    if (dialogue.typo)
      article.classList.add("typo");
    if (dialogue.type !== "normal")
      article.classList.add(dialogue.type);
    article.innerText = "";
    for (let i=0; i<dialogue.text.length; i++) {
      const line = dialogue.text[i];
      if (dialogue.type !== "normal") {
        const hl = document.createElement("span");
        hl.classList.add("highlight");
        hl.innerHTML = escapeHTML(line);
        article.appendChild(hl);
        hl.outerHTML += `<br>`;
      } else {
        article.innerHTML += escapeHTML(line);
        if (i < dialogue.text.length-1) {
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
    //if there's a clean way to do it in JSDOM I'd love to hear it
    let match = undefined;
    while (match !== null) {
      match = article.innerHTML.match(/\\\{([\s\S]+?)(?:\\\}|$)/);
      if (match)
        article.innerHTML = article.innerHTML.replace(match[0], `<span class="red">${match[1]}</span>`);
    }
    document.body.insertBefore(article, buildaboveme);
    article.outerHTML += "\n  ";
  }
  timer.stop("build HTML");
  return dom.serialize();
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

module.exports = { targetPage, readPage, clearArea, textboxEquals };