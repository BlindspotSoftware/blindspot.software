import {
  gsapWithCSS
} from "./chunk-4AU5C4SF.js";
import "./chunk-R3PFIBHC.js";

// src/js/pulseAnimation.js
var flareSpan = document.querySelector(".flare span");
var pointerX;
var pointerY;
var percentage = (partialValue, totalValue) => {
  return 100 * partialValue / totalValue;
};
var updateMouseCoords = (event) => {
  pointerX = event.pageX;
  pointerY = event.pageY;
};
["pointermove", "wheel"].forEach((event) => {
  document.addEventListener(event, (e) => {
    updateMouseCoords(e);
    console.log(e);
  });
});
var setStartPosition = () => {
  let x, y;
  x = percentage(pointerX, document.body.offsetWidth);
  y = percentage(pointerY, document.body.offsetHeight);
  gsapWithCSS.set(flareSpan, {
    "--pointer-y": `${y}%`,
    "--pointer-x": `${x}%`
  });
};
var flareAnimation = gsapWithCSS.to(flareSpan, {
  backgroundImage: "radial-gradient(black 20%, gray 60%, black 80%)",
  backgroundSize: "200% 200%",
  opacity: 0,
  duration: 4,
  ease: "power2",
  repeat: -1,
  onRepeat: setStartPosition
});
document.addEventListener("click", () => {
  setStartPosition();
  flareAnimation.restart();
});
