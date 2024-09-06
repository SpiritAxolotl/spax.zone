const fetchJsonData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

let djmaxData = [];
let allSongs = [];
let options = [];

const parseOptions = () => {
  const tempOptions = {
    "eligibility": [],
    "games": [],
    "misc": []
  };
  for (const element of document.querySelectorAll(`#eligibility-include input:checked`))
    tempOptions.eligibility.push(element.name);
  for (const element of document.querySelectorAll(`#games-include input:not(#all):checked + label`))
    tempOptions.games.push(element.innerText);
  for (const element of document.querySelectorAll(`#miscellaneous input:checked`))
    tempOptions.misc.push(element.name);
  options = tempOptions;
};

parseOptions();
let audioVolume = +(localStorage.getItem("DJMAX_audioVolume") ?? 0.5);
let songHistory = [];

if (localStorage.getItem("DJMAX_history"))
  songHistory = JSON.parse(localStorage.getItem("DJMAX_history"));

const main = async () => {
  djmaxData = await fetchJsonData("/data/djmax.json");
  Object.keys(djmaxData).forEach(game => {
    djmaxData[game].forEach(song => {
      song.Game = game;
    });
  });
  updateSongsSelected();
  genSongList();
};

const genSongList = () => {
  allSongs = [];
  const eligibleKey = {
    "✓": "eligible",
    "?": "maybe-eligible",
    "not recommended": "maybe-eligible",
    "see notes": "maybe-eligible",
    "x": "not-eligible"
  };
  Object.keys(djmaxData).forEach(game => {
    if (!options.games.includes(game)) return;
    allSongs.push(...djmaxData[game].filter(song => {
      return options.eligibility.includes(eligibleKey[song.Eligible.toLowerCase()] ?? "not-eligible");
    }));
  });
  if (allSongs.length === 0)
    document.querySelector(`#logo-button`).disabled = true;
  else if (allSongs.length > 0 && document.querySelector(`#logo-button`).disabled)
    document.querySelector(`#logo-button`).removeAttribute("disabled");
};

const randomSong = () => {
  const rand = allSongs[Math.floor(allSongs.length * Math.random())];
  if (typeof rand !== "object") {
    console.log("empty.............");
    return;
  }
  console.log(rand);
  songHistory.push(rand);
  if (songHistory.length > 10) songHistory.splice(0, 1);
  localStorage.setItem("DJMAX_history", JSON.stringify(songHistory));
  document.querySelector(`#artist`).innerText = "Artist: " + rand.Artist;
  document.querySelector(`#game`).innerText = "Game: " + rand.Game;
  if (rand.DLC) document.querySelector(`#game`).innerText += ` (${rand.DLC})`;
  document.querySelector(`#notes`).innerText = "Notes: " + (rand.Notes ?? "none");
  document.querySelector(`#eligibility`).innerText = "Eligiblity: " + rand.Eligible;
  document.querySelector(`#errors`).innerText = "";
  if (rand.Link) {
    document.querySelector(`#title`).innerText = "Title: ";
    if (options.misc.includes("use-cobalt"))
      cobaltFetch(rand.Link);
    else {
      handleAudio();
    }
    const a = document.createElement("a");
    a.href = rand.Link;
    a.target = "_blank";
    a.innerText = rand.Title;
    document.querySelector(`#title`).appendChild(a);
  } else {
    document.querySelector(`#title`).innerText = "Title: " + rand.Title;
  }
};

let currentAudioBlob;

const cobaltFetch = async (url) => {
  const errors = document.querySelector(`#errors`);
  const response = await fetch("https://api.cobalt.tools/api/json", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      url: url,
      filenamePattern: "basic",
      isAudioOnly: true,
      aFormat: "mp3"
    }),
  })
    .then(response => response.json())
    .then(content => {
      try {
        if (content.status === "error") {
          errors.innerHTML = `Uh oh! Cobalt gave an error.<br>Please click on <a href="${url}" target="_blank">this</a> link to listen to the song.<br>Cobalt's error:<br>${content.text}`;
        } else if (content.url) {
          handleAudio(content);
        } else {
          errors.innerHTML = `Uh oh! Cobalt didn't return a url but didn't give an error.<br>Please click on <a href="${url}" target="_blank">this</a> link to listen to the song.`;
          console.warn(content);
        }
      } catch {
        errors.innerHTML = `Uh oh! The request to cobalt failed.<br>Please click on <a href="${url}" target="_blank">this</a> link to listen to the song.`;
      }
  });
};

const handleAudio = async (content) => {
  const audio = document.querySelector(`#song-info > audio`);
  audio.removeAttribute("src");
  if (typeof content !== "object") {
    audio.removeAttribute("controls");
    if (currentAudioBlob)
      URL.revokeObjectURL(currentAudioBlob);
  } else {
    const response = await fetch(content.url);
    if (response.ok) {
      audio.setAttribute("controls", "");
      if (currentAudioBlob)
        URL.revokeObjectURL(currentAudioBlob);
      currentAudioBlob = await response.blob();
      audio.src = URL.createObjectURL(currentAudioBlob);
      audio.currentTime = 0;
      audio.volume = audioVolume;
      setTimeout(() => {
        document.querySelector(`#logo-button`).removeAttribute("disabled");
      }, 3000);
    }
  }
};

const updateSongsSelected = () => {
  updateTheAllCheckbox();
  genSongList();
  document.querySelector(`#songs-selected`)
    .innerText = "Songs selected: " + allSongs.length;
};

const updateTheAllCheckbox = () => {
  const all = document.querySelector(`#all`);
  const gamesSelected = document.querySelectorAll(`#games-include input:not(#all):checked`);
  const games = document.querySelectorAll(`#games-include input:not(#all)`);
  if (gamesSelected.length === games.length) {
    all.indeterminate = false;
    all.checked = true;
  } else if (gamesSelected.length === 0) {
    all.indeterminate = false;
    all.checked = false;
  } else if (gamesSelected.length < games.length) {
    all.checked = false;
    all.indeterminate = true;
  }
};

document.querySelector(`#all`).addEventListener("click", (e) => {
  const all = document.querySelector(`#all`);
  const games = document.querySelectorAll(`#games-include input:not(#all)`);
  if (!all.checked && !all.indeterminate) {
    all.indeterminate = false;
    all.checked = false;
    for (const game of games)
      game.checked = false;
  } else {
    all.indeterminate = false;
    all.checked = true;
    for (const game of games)
      game.checked = true;
  }
  updateSongsSelected();
});

for (const element of document.querySelectorAll(`#options fieldset > div:not(:has(#all))`))
  element.addEventListener("click", updateSongsSelected);

document.querySelector(`#logo-button`).addEventListener("click", () => {
  parseOptions();
  randomSong();
  if (options.misc.includes("use-cobalt")) {
    document.querySelector(`#logo-button`).disabled = true;
  }
});

document.querySelector(`#song-info > audio`).addEventListener("canplaythrough", () => {
  if (options.misc.includes("autoplay-audio"))
    document.querySelector(`#song-info > audio`).play();
});
document.querySelector(`#song-info > audio`).addEventListener("volumechange", () => {
  audioVolume = document.querySelector(`#song-info > audio`).volume;
  localStorage.setItem("DJMAX_audioVolume", audioVolume);
});

main();
