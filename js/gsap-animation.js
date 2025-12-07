document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(".box-2", {
    scrollTrigger: {
      trigger: ".box-2",
      start: "top 80%",
      toggleActions: "restart none none none",
    }, // start the animation when ".box" enters the viewport (once)

    pin: true, // pin the element while it's in the viewport
    scale: 0.6,
    duration: 1,
  });

  scrollTrigger.create({
    trigger: ".box-3",
    start: "top 80%",
    onEnter: () => {
      gsap.to(".box-3", {
        pin: true,
        scale: 0.6,
        duration: 1,
      });
    },
  });
});
