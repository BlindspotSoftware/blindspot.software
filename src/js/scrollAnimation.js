gsap.registerPlugin(ScrollTrigger);

let headlines = gsap.utils.toArray('.braces');

headlines.forEach((headline) => {
  gsap.to(headline, {
    scrollTrigger: {
      trigger: headline,
      toggleActions: 'play complete none reset',
      toggleClass: 'enable',
    },
    duration: 0.5,
    '--gap': '0',
  });
});
