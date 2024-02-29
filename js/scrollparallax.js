//thanks sora
const body = document.getElementsByTagName("body")[0];
document.onscroll = () => {
  document.body.style.backgroundPositionY = (window.scrollY * 0.5) + "px";
}