//thanks sora
const bg = document.querySelector("#bg");
document.body.onscroll = function() {
  document.getElementById("bg").style.backgroundPositionY = (window.scrollY * 0.5) + "px";
}
/*
let pt = Date.time();
let ct = Date.time();
requestAnimationFrame(xpos, 1);
function xpos() {
  document.getElementById("bg").style.backgroundPositionX = (ct-pt) + "px";
}
*/
