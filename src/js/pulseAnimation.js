const flareSpan = document.querySelector('.flare span');

let pointerX, pointerY;

function updatePointerPosition(event) {
  let x = event.pageX;
  let y = event.pageY;

  pointerX = (x / document.body.offsetWidth) * 100;
  pointerY = (y / document.body.offsetHeight) * 100;
}

function updateFlareProperties() {
  if (!(pointerX && pointerY)) return;

  flareSpan.style.setProperty('--pointer-x', `${pointerX}%`);
  flareSpan.style.setProperty('--pointer-y', `${pointerY}%`);

  console.log({ x: pointerX, y: pointerY });
}

// GSAP's RAF(requestAnimationFrame), falls back to set timeout
//gsap.ticker.add(updatePointerPosition, updateFlareProperties);

document.addEventListener('pointermove', updatePointerPosition);
document.addEventListener('mousewheel', updatePointerPosition);

// Only set properties each time the animation starts over
flareSpan.addEventListener('animationiteration', updateFlareProperties);
