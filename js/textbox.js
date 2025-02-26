const setupDialogue = (textbox) => {
  
};

const startDialogue = (textbox) => {
  
};

for (const textbox of document.querySelectorAll(`article`)) {
  textbox.addEventListener("click", setupDialogue, textbox);
}