const observerGeneralItems = document.querySelectorAll('.observe');

const generalObserverItems = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
                entry.target.classList.add("observed");
            } else if (entry.intersectionRatio < 0.4) {
                entry.target.classList.remove("observed");
            }
        });
    },
    { threshold: 0.4, root: null, rootMargin: "0px" },
); // Triggers when section is 50% visible

observerGeneralItems.forEach((item) => generalObserverItems.observe(item));