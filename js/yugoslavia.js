const fetchText = async (url) => {
  let data = [];
  await fetch(url)
    .then(response => response.text())
    .then(d => data = d);
  return data;
};

let g = await fetchText("https://spax.zone/yugoslavia.html");

g = g.substring(g.indexOf("<body>")+6, g.indexOf("</body>"));
g = g.replace(/<script data-cfasync="false".*><\/script>/, "");

document.querySelector(`#spaxscript`).innerHTML = g;