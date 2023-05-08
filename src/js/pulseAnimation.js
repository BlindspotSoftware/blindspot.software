import gsap from 'gsap';

const flareSpan = document.querySelector('.flare span');

let pointerX, pointerY, x, y;
let initialMouseMove = true;
let timer;

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

// Only play animation if mouse is moving
window.addEventListener('mousemove', (event) => {
  if (initialMouseMove) {
    initialMouseMove = false;

    updateFlareProperties();

    gsap.fromTo(
      flareSpan,
      {
        backgroundSize: '0% 0%',
        opacity: 1,
      },
      {
        backgroundSize: '200% 200%',
        opacity: 0,
        duration: 5,
        ease: 'power3',
      }
    );
  }

  function mouseStopped() {
    initialMouseMove = true;

    gsap.to(flareSpan, {
      backgroundSize: '0% 0%',
      duration: 0,
      opacity: 0,
      ease: 'none',
    });
  }

  clearTimeout(timer);
  timer = setTimeout(mouseStopped, 1500);
});
