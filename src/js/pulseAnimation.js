import gsap from 'gsap';

const flareSpan = document.querySelector('.flare span');

let pointerX, pointerY;

const percentage = (partialValue, totalValue) => {
  return (100 * partialValue) / totalValue;
};

const updateMouseCoords = (event) => {
  pointerX = event.pageX;
  pointerY = event.pageY;
};

['pointermove', 'wheel'].forEach((event) => {
  document.addEventListener(event, (e) => {
    updateMouseCoords(e);
  });
});

const setStartPosition = () => {
  let x, y;

  x = percentage(pointerX, document.body.offsetWidth);
  y = percentage(pointerY, document.body.offsetHeight);

  gsap.set(flareSpan, {
    '--pointer-y': `${y}%`,
    '--pointer-x': `${x}%`,
  });
};

const flareAnimation = gsap.to(flareSpan, {
  backgroundImage: 'radial-gradient(black 20%, gray 60%, black 80%)',
  backgroundSize: '200% 200%',
  opacity: 0,
  duration: 4,
  ease: 'power2',
  repeat: -1,
  onRepeat: setStartPosition,
});

document.addEventListener('click', () => {
  setStartPosition();
  flareAnimation.restart();
});
