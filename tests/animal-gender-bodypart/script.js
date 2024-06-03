const button = document.querySelector(`#spin-button`);
const animalspan = document.querySelector(`#animal`);
const genderspan = document.querySelector(`#gender`);
const partspan = document.querySelector(`#bodypart`);
const atspan = document.querySelector(`#at`);
const username = document.querySelector(`#username`);
const separatorbutton = document.querySelector(`#separator-button`);
const copybutton = document.querySelector(`#copy-button`);
const separatecomponentsbutton = document.querySelector(`#separatecomponents-button`);
const genitalbodypartbutton = document.querySelector(`#genitalbodypart-button`);
const separatorspans = Array.from(document.querySelectorAll(`.separator`));
const separators = [
  {
    name: "Dash",
    char: "-"
  },
  {
    name: "Underscore",
    char: "_"
  },
  {
    name: "Space",
    char: " "
  },
  {
    name: "Nothing",
    char: ""
  }
];
const defaultseparator = separators[0].char; //dash by default
let separator = defaultseparator;
//because the % operator is REMAINDER not MODULO
const mod = (n, d) => {
  return ((n % d) + d) % d;
};
let shift = false;
document.addEventListener('keydown', (e) => { shift = e.shiftKey; });
document.addEventListener('keyup', (e) => { shift = e.shiftKey; });
const chosen = {
  animal: "",
  gender: "",
  part: ""
};
const sanitize = (str) => {
  return str.replaceAll(/\s+/g, separator);
};
const setusername = (component) => {
  switch (component) {
    case "animal":
      animalspan.innerText = sanitize(chosen.animal);
      break;
    case "gender":
      genderspan.innerText = sanitize(chosen.gender);
      break;
    case "part":
      partspan.innerText = sanitize(chosen.part);
      break;
    default:
      animalspan.innerText = sanitize(chosen.animal);
      genderspan.innerText = sanitize(chosen.gender);
      partspan.innerText = sanitize(chosen.part);
      break;
  }
};
const changeSeparator = (n) => {
  const custom = typeof n === "string";
  const index = separators.indexOf(separators.find(item => item.char === (custom ? n : separator)));
  const dir = custom ? 0 : shift ? -1 : 1;
  const newseparator = separators[mod(index+dir, separators.length)];
  localStorage.setItem("separator", newseparator.char);
  separatorbutton.innerHTML = `<div>${newseparator.name}</div>`;
  separator = newseparator.char;
  document.querySelectorAll(`.separator`).forEach(e => e.innerText = separator);
  setusername();
};
changeSeparator(localStorage.getItem("separator") ?? defaultseparator);
let separatecomponents = localStorage.getItem("separateComponents")==="true" ?? true;
const changeSeparateComponents = (n) => {
  separatecomponents = n ?? separatecomponentsbutton.innerText !== "Yes";
  if (separatecomponents) {
    separatecomponentsbutton.innerHTML = `<div>Yes</div>`;
    localStorage.setItem("separateComponents", true);
  } else {
    separatecomponentsbutton.innerHTML = `<div>No</div>`;
    localStorage.setItem("separateComponents", false);
  }
  separatorspans.forEach(e => {
    if (separatecomponents)
      e.style.display = "inline-block";
    else
      e.style.display = "none";
  });
};
changeSeparateComponents(localStorage.getItem("separateComponents")==="true" ?? true);
let genitalbodypart = localStorage.getItem("genitalBodypart")==="true" ?? false;
const changeGenitalBodypart = (n) => {
  genitalbodypart = n ?? genitalbodypartbutton.innerText !== "Yes";
  if (genitalbodypart) {
    genitalbodypartbutton.innerHTML = `<div>Yes</div>`;
    localStorage.setItem("genitalBodypart", true);
  } else {
    genitalbodypartbutton.innerHTML = `<div>No</div>`;
    localStorage.setItem("genitalBodypart", false);
  }
};
changeGenitalBodypart(localStorage.getItem("genitalBodypart")==="true" ?? false);
const initsanitize = (arr) => {
  return Array.from(arr)
    //.filter(item => !item.match(/\s|\-/g))
    //.map(item => !item.match(/\s|\-/g))
    .map(item => item
      .toLowerCase()
      //.replaceAll(/\s+/g, separator)
      .replaceAll(/[^\w\s]/g, "")
    );
};
const animals = initsanitize(animalList);
const genders = initsanitize(genderList);
const bodyparts = initsanitize([...partList, ...boneList]);
const genitals = initsanitize([...penisList, ...vaginaList, ...breastList]);
//const parts = genitalbodypart ? genitals : bodyparts;
const random = (arr) => {
  return arr[Math.floor(Math.random()*arr.length)];
};
let unhidden = false;
const hideAndPos = () => {
  unhidden = true;
  username.style.visibility = "visible";
  button.disabled = true;
  const elements = [animalspan, genderspan, partspan, atspan, ...separatorspans];
  elements.forEach(e => {
    e.classList.add("slide");
    e.style.opacity = 1;
  });
  setTimeout(() => {
    button.disabled = false;
    copybutton.style.opacity = 1;
    copybutton.disabled = false;
  }, 1250);
};
const spin = (component) => {
  if (!unhidden)
    hideAndPos();
  switch (component) {
    case "animal":
      chosen.animal = random(animals);
      break;
    case "gender":
      chosen.gender = random(genders);
      break;
    case "part":
      chosen.part = random(genitalbodypart ? genitals : bodyparts);
      break;
    default:
      chosen.animal = random(animals);
      chosen.gender = random(genders);
      chosen.part = random(genitalbodypart ? genitals : bodyparts);
      break;
  }
  setusername(component);
};

animalspan.addEventListener("click", () => {
  spin("animal");
});
genderspan.addEventListener("click", () => {
  spin("gender");
});
partspan.addEventListener("click", () => {
  spin("part");
});

copybutton.addEventListener("click", () => {
  try {
    writeClipboardText(username.innerText);
  } catch (e) {}
});

async function writeClipboardText(text) {
  try {
      await navigator.clipboard.writeText(text);
      copybutton.classList.add(`flashgreen`);
      setTimeout(() => { copybutton.classList.remove(`flashgreen`) }, 250);
  } catch (error) {
      console.error(error.message);
      copybutton.classList.add(`flashred`);
      setTimeout(() => { copybutton.classList.remove(`flashred`) }, 250);
  }
}