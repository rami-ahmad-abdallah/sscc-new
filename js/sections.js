const allSections = document.querySelectorAll('section');

const logo = document.querySelector('.logo');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const sectionId = entry.target.id;

        logo.classList.toggle(sectionId, entry.isIntersecting);
        if (entry.isIntersecting) {


            console.log("you are now on :" + sectionId);
        }
    });
}, { threshold: 0, root: null, rootMargin: '0px' }); // Triggers when section is 50% visible



allSections.forEach(section => sectionObserver.observe(section));
