import gsap from 'gsap';

const flareSpan = document.querySelector('.flare span');

let pointerX, pointerY, x, y;

const percentage = (partialValue, totalValue) => {
  return (100 * partialValue) / totalValue;
};

const movePointer = () => {
  x = percentage(pointerX, document.body.offsetWidth);
  y = percentage(pointerY, document.body.offsetHeight);
};

// GSAP's 'requestAnimationFrame' falls back to set timeout
gsap.ticker.add(movePointer);

const updateFlareProperties = () => {
  gsap.set(flareSpan, {
    '--pointer-y': `${y}%`,
    '--pointer-x': `${x}%`,
  });
};

const updateMouseCoords = (event) => {
  pointerX = event.pageX;
  pointerY = event.pageY;
};

['pointermove', 'mousewheel'].forEach((event) => {
  document.addEventListener(event, updateMouseCoords);
});

// Only set properties each time the animation starts over
flareSpan.addEventListener('animationiteration', updateFlareProperties);
