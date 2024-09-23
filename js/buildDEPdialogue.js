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
    for (const dataIterator of data) {
      if (dataIterator.list) processDialogue(dataIterator.list);
      else if (dataIterator.pages)
        for (const pagesIterator of dataIterator.pages)
          if (pagesIterator.list)
            processDialogue(pagesIterator.list);
      else continue;
    }
    timer.stop("parse dialogue JSON");
    removeDuplicates();
    await applyOverrides(true);
    fs.writeFileSync("./data/dep_dialogue_dump.json", JSON.stringify(allDialogue));
    const dom = await readPage(targetPage);
    fs.writeFileSync(targetPage, renderHTML(dom, dom.window.document));
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

const processDialogue = (list) => {
  const dialogue = {
    who: "",
    emotion: "",
    text: []
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
    }
    allDialogue.push({...dialogue});
    if (!overflow) {
      dialogue.who = "";
      dialogue.emotion = "";
    }
    dialogue.text = [];
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
  return unsafe.replaceAll(`"`, ``);
};

const clearArea = (document) => {
  const timer = new Timer("clearing the area");
  document.querySelectorAll(`#buildbelowme ~ :not(#buildaboveme):not(#buildaboveme ~ *)`)
    .forEach(e=>e.remove());
  document.body.innerHTML = document.body.innerHTML
    .replace(/(?<=<div id="buildbelowme"><\/div>)\s+(?=<div id="buildaboveme"><\/div>)/, "\n  ");
  timer.stop("clear the area");
};

const renderHTML = (dom, document) => {
  const timer = new Timer("rendering HTML");
  let body = ``;
  for (const dialogue of allDialogue) {
    body += `\n  <article`;
    if (dialogue.who)
      body += ` who="${escapeHTMLString(dialogue.who)}"`
    if (dialogue.emotion)
      body += ` emotion="${escapeHTMLString(dialogue.emotion)}"`
    if (dialogue.typo)
      body += ` class="typo"`;
    body += `>\n    `;
    let text = dialogue.text.reduce((acc,e)=>
      acc + escapeHTML(e) + `<span class="break${e.match(/[^\w\s]\s*$/g)?` end"`:`"`}></span>\n    `, ""
    ).replace(/<span\s+class="break(\s+end)?"><\/span>\n\s+$/g, "");
    let match = undefined;
    while (match !== null) {
      match = text.match(/\\\{([\s\S]+?)(?:\\\}|$)/);
      if (match)
        text = text.replace(match[0], `<span class="red">${match[1]}</span>`);
    }
    body += text;
    body += `\n  </article>`;
  }
  timer.stop("render HTML");
  clearArea(document);
  document.querySelector(`#buildbelowme`).outerHTML += body;
  return dom.serialize();
};

/* utils */

const textboxEquals = (a,b) => {
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