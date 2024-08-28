const fs = require('fs');
const { JSDOM } = require('jsdom');

const targetPage = "./html/DEPalldialogue.html";

const overrides = [
  {
    who: "yoki",
    emotion: "annoyed",
    text: [
      "That's you're only decent",
      "quality. "
    ],
    index: 0,
    replace: "you're",
    replacer: "your"
  }
];

let allDialogue = [];

const main = () => {
  fs.readFile("https://cdn.spax.zone/dep_event_dump.json", "utf8", async (err, d) => {
    if (err) throw err;
    const data = JSON.parse(d);
    for (const dataIterator of data) {
      if (dataIterator.list) processDialogue(dataIterator.list);
      else if (dataIterator.pages?.[0]?.list) processDialogue(dataIterator.pages?.[0]?.list);
      else continue;
    }
    removeDuplicates();
    applyOverrides(true);
    fs.writeFileSync("./misc/dep_dialogue_dump.json", JSON.stringify(allDialogue));
    const dom = await readPage(targetPage);
    fs.writeFileSync(targetPage, renderHTML(dom, dom.window.document));
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
  const uniqueSet = new Set();
  allDialogue = allDialogue.filter(dialogue => {
    const stringified = JSON.stringify(dialogue);
    if (!uniqueSet.has(stringified)) {
      uniqueSet.add(stringified);
      return true;
    }
    return false;
  });
};

const applyOverrides = (duplicatesRemoved=false) => {
  allDialogue.forEach(dialogue => {
    for (let i=0; i<overrides.length; i++) {
      const override = overrides[i];
      if (textboxEquals(override, dialogue)) {
        dialogue.text[override.index] = dialogue.text[override.index].replace(override.replace, override.replacer);
        if (duplicatesRemoved) {
          overrides.splice(overrides.indexOf(override), 1);
          i--;
        }
      }
    }
  });
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

const clearBelow = (document) => {
  document.querySelectorAll(`#buildbelowme ~ *`).forEach(e=>e.remove());
  document.body.innerHTML = document.body.innerHTML.replace(/\s+$/, "");
};

const renderHTML = (dom, document) => {
  let body = `\n`;
  for (const dialogue of allDialogue) {
    body += `  <article`;
    if (dialogue.who)
      body += ` who="${escapeHTMLString(dialogue.who)}"`
    if (dialogue.emotion)
      body += ` emotion="${escapeHTMLString(dialogue.emotion)}"`
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
    body += `\n  </article>\n`;
  }
  clearBelow(document);
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

module.exports = { targetPage, readPage, clearBelow, textboxEquals };