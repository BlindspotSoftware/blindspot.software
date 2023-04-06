import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let headlines = gsap.utils.toArray('.braces');

headlines.forEach((headline) => {
  // Set gap to opened state first (JS is active)
  headline.style.setProperty('--gap', '1em');

  gsap.to(headline, {
    scrollTrigger: {
      trigger: headline,
      toggleActions: 'play complete none reset',
    },
    duration: 0.5,
    ease: 'elastic.in(2, 1)',
    // Closed state
    // Closed state
    '--gap': '0',
  });
});
