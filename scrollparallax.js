var bg = document.querySelector("#bg");

document.body.onscroll = function() {

document.getElementById('bg').style.backgroundPositionY = (window.scrollY / 2) + "px"
}
