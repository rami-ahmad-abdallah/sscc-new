let strokeSvg = document.querySelectorAll(".stroke-effect");

const strokeObserver = new IntersectionObserver(
  (elements) => {
    elements.forEach((el) => {
      el.target.classList.toggle("activate-effect", el.isIntersecting);
      if (el.isIntersecting) strokeObserver.unobserve(el.target);
    });
  },
  {
    threshold: 0.25,
    root: null,
  }
);

strokeSvg.forEach((el) => strokeObserver.observe(el));
