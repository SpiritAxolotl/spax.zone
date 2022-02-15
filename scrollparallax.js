alert("Proof that the javascript linked properly");

var body = document.querySelector("body");
var bg = document.querySelector("#bg");

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + ", " + yPos + "px, 0)";
}

window.addEventListener("DOMContentLoaded", scrollLoop, false);

var xScrollPosition;
var yScrollPosition;

function scrollLoop() {
    xScrollPosition = window.scrollX;
    yScrollPosition = window.scrollY;

    setTranslate(0, yScrollPosition * -0.4, bg);

    requestAnimationFrame(scrollLoop);
}
