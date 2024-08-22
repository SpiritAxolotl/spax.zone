const fs = require('fs');
const { JSDOM } = require('jsdom');

const targetPage = "./html/DEPalldialogue.html";

const allDialogue = [];
fs.readFile("./misc/dep_event_dump.json", "utf8", (err, d) => {
  if (err) throw err;
  const data = JSON.parse(d);
  for (const dataIterator of data) {
    if (dataIterator.list) processDialogue(dataIterator.list);
    else if (dataIterator.pages?.[0]?.list) processDialogue(dataIterator.pages?.[0]?.list);
    else continue;
  }
  const startTime = Date.now();
  for (let i=0; i<allDialogue.length; i++)
    for (let j=i+1; j<allDialogue.length; j++)
      if (JSON.stringify(allDialogue[i]) === JSON.stringify(allDialogue[j]))
        allDialogue.splice(j, 1);
  console.log(`it took ${(Date.now()-startTime)/1000} seconds to remove duplicates.`);
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
      if (dialogue.text.length >= 3) {
        allDialogue.push({...dialogue});
        dialogue.text = [];
      }
      dialogue.text.push(
        listIterator.parameters[0]
          .replaceAll(/\\SE\[\d+\]/g, "") //sound effect cues
          .replaceAll(/\\\./g, "") //short pause cues
          .replaceAll(/\\/g, "") //anything else that's escaped
      );
    } else if (listIterator.code === 101) { //face
        if (dialogue.text.length > 0) {
          allDialogue.push({...dialogue});
          dialogue.who = "";
          dialogue.emotion = "";
          dialogue.text = [];
        }
      const match = listIterator.parameters[0].match(/^(\w+?)_(?:Portrait_)?(\w+?)$/);
      if (match) {
        dialogue.who = match[1].toLowerCase();
        dialogue.emotion = match[2].toLowerCase();
      }
    } else {
      if (dialogue.text.length > 0) {
        allDialogue.push({...dialogue});
        dialogue.who = "";
        dialogue.emotion = "";
        dialogue.text = [];
      }
      continue;
    }
  }
};

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
  let body = "\n";
  for (const dialogue of allDialogue) {
    body += `  <article${dialogue.who ? ` who="${escapeHTMLString(dialogue.who)}"` : ""}${dialogue.emotion ? ` emotion="${escapeHTMLString(dialogue.emotion)}"` : ""}>
    ${dialogue.text.map(e=>escapeHTML(e)).join("<br>\n      ")}
  </article>\n`;
  }
  document.body.innerHTML = body;
  return dom.serialize();
};