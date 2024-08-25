const fs = require('fs');
const { JSDOM } = require('jsdom');

const targetPage = "./html/DEPalldialogue.html";

let allDialogue = [];
fs.readFile("./misc/dep_event_dump.json", "utf8", (err, d) => {
  if (err) throw err;
  const data = JSON.parse(d);
  for (const dataIterator of data) {
    if (dataIterator.list) processDialogue(dataIterator.list);
    else if (dataIterator.pages?.[0]?.list) processDialogue(dataIterator.pages?.[0]?.list);
    else continue;
  }
  removeDuplicates();
  fs.writeFileSync("./misc/dep_dialogue_dump.json", JSON.stringify(allDialogue));
  fs.readFile(targetPage, "utf8", (err, html) => {
    if (err) throw err;
    const dom = new JSDOM(html);
    const document = dom.window.document;
    fs.writeFileSync(targetPage, renderHTML(dom, document));
  });
});

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
      const match = listIterator.parameters[0].match(/^(\w+?)(?:_(?:Portrait_)?(?:test_)?(\w+?))?$/i);
      if (match?.[1])
        dialogue.who = match[1].toLowerCase();
      if (match?.[2])
        dialogue.emotion = match[2].toLowerCase();
    } else {
      pushTextbox(dialogue);
      continue;
    }
  }
};

const pushTextbox = (dialogue, overflow) => {
  overflow ??= false;
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
  /*for (let i=0; i<allDialogue.length; i++)
    for (let j=i+1; j<allDialogue.length; j++)
      if (JSON.stringify(allDialogue[i]) === JSON.stringify(allDialogue[j]))
        allDialogue.splice(j--, 1);*/
  allDialogue = [...new Set(allDialogue.map(e=>JSON.stringify(e)))].map(e=>JSON.parse(e));
}

const escapeHTML = (unsafe) => {
  return unsafe
    .replaceAll(`&`, "&amp;")
    .replaceAll(`<`, "&lt;")
    .replaceAll(`>`, "&gt;")
    .replaceAll(`"`, "&quot;")
    .replaceAll(`'`, "&#039;");
}
const escapeHTMLString = (unsafe) => {
  return unsafe.replaceAll(`"`, ``);
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
      acc + escapeHTML(e) + `<br${e.match(/[^\w\s]\s*$/g)?" end":""}>\n    `, ""
    ).replace(/<br(\s+end)?>\n\s+$/g, "");
    let match = undefined;
    while (match !== null) {
      match = text.match(/\\\{([\s\S]+?)(?:\\\}|$)/);
      if (match)
        text = text.replace(match[0], `<span class="red">${match[1]}</span>`);
    }
    body += text;
    body += `\n  </article>\n`;
  }
  document.body.innerHTML = body;
  return dom.serialize();
};