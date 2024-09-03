//const fs = require("fs");

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
const main = async () => {
  djmaxData = await fetchJsonData("/data/djmax.json");
  Object.keys(djmaxData).forEach(game => {
    djmaxData[game].forEach(song => {
      song.Game = game;
    });
    allSongs.push(...djmaxData[game].filter(song => {
      return song.Eligible === "✓";
    }));
  });
  //console.log(allSongs.length);
};

main();

const randomSong = () => {
  const rand = allSongs[Math.floor(allSongs.length * Math.random())];
  console.log(rand);
  document.querySelector(`#title`).innerText = rand.Title;
  document.querySelector(`#artist`).innerText = rand.Artist;
  document.querySelector(`#game`).innerText = rand.Game;
  if (rand.DLC) document.querySelector(`#game`).innerText += ` (${rand.DLC})`;
  if (rand.Link) {
    cobaltFetch(rand.Link);
    document.querySelector(`#title`).href = rand.Link;
  }
};

const cobaltFetch = async (url) => {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
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
        if (content.url) {
          const audio = document.querySelector(`#yeag > audio`);
          audio.src = content.url;
          audio.setAttribute("autoplay", "");
          audio.setAttribute("controls", "");
          audio.volume = 0.5;
          audio.currentTime = 0;
          audio.play();
        } else console.warn(content);
      } catch {}
  });
};

/*const genYoutubeIframe = (id) => {
  return `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
}

const genSoundcloudIframe = (id) => {
  return `<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1149367978&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>`
}*/

//console.log("fuck");