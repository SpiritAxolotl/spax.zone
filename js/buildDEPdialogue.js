const fs = require('fs');

fs.readFile("./misc/dep_event_dump.json", "utf8", (err, data) => {
  if (err) throw err;
  processFile(data);
});

const allDialogue = [];
processFile = (d) => {
  const data = JSON.parse(d);
  for (const dataIterator of data) {
    if (dataIterator.list) processDialogue(dataIterator.list);
    else if (dataIterator.pages?.[0]?.list) processDialogue(dataIterator.pages?.[0]?.list);
    else continue;
  }
  fs.writeFileSync("./misc/dep_dialogue_dump.json", JSON.stringify(allDialogue), { encoding: "utf8" });
  fs.writeFileSync("./DEPalldialogue.html", renderHTML());
};

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

const renderHTML = () => {
  const header = `<!DOCTYPE HTML>
<html manifest="manifest" lang="en-US">
  <head>
    <meta charset="utf-8">
    <title>All DEP Dialogue</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="theme-color" content="#306850">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="A dump of all dialogue in Temmie's game &quot;Dweller's Empty Path&quot;.">
    <meta property="og:title" content="All DEP Dialogue">
    <meta property="og:description" content="A dump of all dialogue in Temmie's game &quot;Dweller's Empty Path&quot;.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://spax.zone/images/faces/yoki/Neutral.png" type="image/png">
    <link rel="icon" href="/images/faces/yoki/Neutral.png">
    <link rel="stylesheet" href="/css/experimental.css" type="text/css">
  </head>
  <body>
`;
  const footer = `  </body>
</html>`;
  let body = "";
  for (const dialogue of allDialogue) {
    body += `    <article${dialogue.who ? ` who="${escapeHTMLString(dialogue.who)}"` : ""}${dialogue.emotion ? ` emotion="${escapeHTMLString(dialogue.emotion)}"` : ""}>
      ${dialogue.text.map(e=>escapeHTML(e)).join("<br>\n      ")}
    </article>
`;
  }
  return header + body + footer;
};