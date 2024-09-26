const fs = require('fs');
const { parseHTML } = require('linkedom');
const { Timer } = require('./timer.js');

const targetPage = "./html/DEPalldialogue.html";
const eventDump = "./data/dep_event_dump.json";

const allDialogue = [[]];
let currentThread = 0;
const endOfThreadCodes = new Set([121, 402, 404]);
//let pickerOption = -1;

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
        if (dataIterator.list) processDialogue(dataIterator.list, file, dataIterator.id);
        else if (dataIterator.pages)
          for (const pagesIterator of dataIterator.pages)
            if (pagesIterator.list)
              processDialogue(pagesIterator.list, file, dataIterator.id);
        else continue;
      }
    }
    timer.stop("parse dialogue JSON");
    allDialogue.pop();
    removeDuplicateThreads();
    //await applyOverrides(true);
    fs.writeFileSync("./data/dep_dialogue_dump.json", JSON.stringify(allDialogue));
    const document = await readPage(targetPage);
    fs.writeFileSync(targetPage, buildHTML(document));
    wholeTimer.stop("build the dialogue");
  });
};

const readPage = async (page) => {
  try {
    const html = await fs.promises.readFile(page, "utf8");
    const dom = parseHTML(html);
    return dom.document;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

const processDialogue = (list, file, id) => {
  const dialogue = {
    who: "",
    emotion: "",
    text: [],
    type: "normal",
    file: file,
    id: id
  };
  for (const listIterator of list) {
    const code = listIterator.code;
    const params = listIterator.parameters;
    if (code === 401) { //dialogue
      pushTextbox(dialogue, {overflow: true});
      dialogue.text.push(
        params[0]
          .replaceAll(/\\SE\[\d+\]/g, "") //sound effect cues
          .replaceAll(/\\\./g, "") //short pause cues
          .replaceAll(/\\[^\{\}]/g, "") //anything else that's escaped (single characters)
      );
    } else if (code === 101) { //face
      pushTextbox(dialogue);
      const match = params[0].match(/^(\w+?)(?:_(?:Portrait_)?(?:test_)?([\w_]+?))?$/i);
      if (match) {
        if (match[1])
          dialogue.who = match[1].toLowerCase();
        if (match[2])
          dialogue.emotion = match[2].toLowerCase();
      }
    } else if (code === 102) { //options
      pushTextbox(dialogue);
      dialogue.type = "picker";
      dialogue.text.push(...params[0]);
    } else if (endOfThreadCodes.has(code)) { //ensured end of thread
      pushTextbox(dialogue, {bump: true});
    }
  }
  pushTextbox(dialogue, {bump: true});
};

const pushTextbox = (dialogue, options={overflow: false, bump: false}) => {
  const thread = allDialogue[currentThread];
  const length = dialogue.text.length;
  if ((options.overflow && length >= 4) || (!options.overflow && length > 0)) {
    //for 600_portrait_test_Enlarged which is just yoki
    if (dialogue.who === "600") {
      dialogue.who = "yoki";
      dialogue.emotion = "neutral";
    } else if (dialogue.who === "youngyoki") {
      dialogue.who = "youngeryoki";
    }
    if (dialogue.type === "picker")
      allDialogue[currentThread].splice(allDialogue[currentThread].length-1, 0, {...dialogue});
    else
      thread.push({...dialogue});
    /*if (pickerOption !== -1) {
      const picker = allDialogue[currentThread-1].find(dl => dl.type === "picker");
      if (picker) {
        thread.from = pickerOption;
        picker.for ??= [];
        picker.for[pickerOption] = [thread[0].file, thread[0].id];
      }
      pickerOption = -1;
    }*/
    if (!options.overflow) {
      dialogue.who = "";
      dialogue.emotion = "";
    }
    dialogue.text = [];
    dialogue.type = "normal";
    if (options.bump && thread.length > 0) {
      currentThread++;
      allDialogue[currentThread] = [];
    }
  }
};

const removeDuplicateThreads = () => {
  const timer = new Timer("Removing duplicates");
  for (let i=0; i<allDialogue.length; i++) {
    const ilen = allDialogue[i].length;
    for (let j=i+1; j<allDialogue.length; j++) {
      const jlen = allDialogue[j].length;
      if (allDialogue[i][0].file !== allDialogue[j][0].file) break;
      if (ilen === jlen) {
        let isDuplicate = true;
        for (let k=0; k<ilen; k++) {
          if (allDialogue[i][k].file !== allDialogue[j][k].file || !textboxEquals(allDialogue[i][k], allDialogue[j][k])) {
            isDuplicate = false;
            break;
          }
        }
        if (isDuplicate) {
          allDialogue.splice(j, 1);
          j--;
        }
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
  const threadId = {index: 0, file: ""};
  //let t = 0;
  for (let i=0; i<allDialogue.length; i++) {
    const thread = allDialogue[i];
    const threaddiv = document.createElement("div");
    threadId.index++;
    if (threadId.file !== thread[0].file) {
      threadId.index = 1;
      threadId.file = thread[0].file;
    }
    threaddiv.id = `${thread[0].file}_${threadId.index}`;
    for (let j=0; j<thread.length; j++) {
      const dialogue = thread[j];
      const article = document.createElement("article");
      if (dialogue.who)
        article.setAttribute("who", dialogue.who);
      if (dialogue.emotion)
        article.setAttribute("emotion", dialogue.emotion);
      //if (dialogue.file !== -1)
      //  article.setAttribute("file", dialogue.file);
      //if (dialogue.typo)
      //  article.classList.add("typo");
      //if (dialogue.last)
      //  article.classList.add("last");
      if (dialogue.type !== "normal")
        article.classList.add(dialogue.type);
      article.id = `${dialogue.file}_${threadId.index}_${j+1}`;
      //article.setAttribute("num", t++);
      for (let k=0; k<dialogue.text.length; k++) {
        const line = dialogue.text[k];
        if (dialogue.type === "picker") {
          const linespan = document.createElement(dialogue.for ? "a" : "span");
          article.appendChild(linespan);
          //if (dialogue.for)
          //  linespan.setAttribute("href", `#${dialogue.for[k].join("_")}`);
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
      threaddiv.appendChild(article);
    }
    document.body.appendChild(threaddiv);
    threaddiv.insertAdjacentHTML("beforebegin", "\n  ");
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

module.exports = { targetPage, readPage, clearArea, textboxEquals };