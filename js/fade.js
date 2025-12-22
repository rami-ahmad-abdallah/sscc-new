let fadeUpElements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
  (elements) => {
    elements.forEach((el) => {
      el.target.classList.toggle("show-fade-up", el.isIntersecting);
      if (el.isIntersecting) observer.unobserve(el.target);
    });
  },
  {
    threshold: 0.25,
    root: null,
  }
);

fadeUpElements.forEach((el) => observer.observe(el));
