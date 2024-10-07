const BACKGROUND_HEIGHT = 676;
const PARALLAX_SPEED = 0.5;

const updateParallax = () => {
  const scrollY = window.scrollY;
  const rawBackgroundY = scrollY * PARALLAX_SPEED;
  const minOffset = rawBackgroundY % BACKGROUND_HEIGHT;
  const positiveOffset = (minOffset + BACKGROUND_HEIGHT) % BACKGROUND_HEIGHT;
  
  document.body.style.backgroundPositionY = `${positiveOffset}px`;
}

document.addEventListener("scroll", updateParallax);

updateParallax();