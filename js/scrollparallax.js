var bg = document.querySelector("#bg");
document.body.onscroll = function() {

document.getElementById('bg').style.backgroundPositionY = (window.scrollY / 2) + "px"
}

let pt = Date.time()
let ct = Date.time()
setInterval(xpos, 1)
function xpos() {
document.getElementById('bg').style.backgroundPositionX = (ct-pt) + "px"
}
