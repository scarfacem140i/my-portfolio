// For the navbar background on scroll
const nav = {
    header: document.querySelector('header'),
    hamburger: document.querySelector('.hamburger'),
    ul: document.querySelector('nav ul'),
    li: document.querySelectorAll('nav ul li')
};

window.addEventListener('scroll', e => {
    if (window.scrollY > 50) {
        nav.header.classList.add('active');
        bubble.style.display = 'block';
    } else {
        nav.header.classList.remove('active');
        bubble.style.display = 'none';
    }
});

// Mobile navbar
function navSlide() {
    nav.hamburger.addEventListener('click', () => {
        console.log('clicked');
        nav.ul.classList.toggle('nav-active');

        // Burger animation
        nav.hamburger.classList.toggle('toggle');

        if (!nav.header.classList.contains('active')) {
            nav.header.classList.add('active');
        } else {
            if (window.scrollY < 50) {
                nav.header.classList.remove('active');
            }
        }
    });
    // Animate Links
    nav.li.forEach((link, index) => {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
            0.2}s`;
    });
}

navSlide();

// For the navbar selector on scroll
const sections = document.querySelectorAll('section');
const bubble = document.querySelector('.bubble');

//'background: linear-gradient(45deg, rgba(221, 214, 243, 1) 0%,rgba(250, 172, 168, 1) 60%)';

const options = {
    threshold: 0.8
};

let observer = new IntersectionObserver(navCheck, options);

function navCheck(entries) {
    if (window.innerWidth > 768) {
        bubble.style.display = 'block';
        entries.forEach(entry => {
            const className = entry.target.className;
            const activeAnchor = document.querySelector(
                `[data-page=${className}]`
            );
            const coords = activeAnchor.getBoundingClientRect();
            const directions = {
                width: coords.width,
                bottom: coords.bottom,
                left: coords.left
            };
            if (entry.isIntersecting) {
                bubble.style.setProperty('width', `${directions.width}px`);
                bubble.style.setProperty('top', `${directions.bottom}px`);
                bubble.style.setProperty('left', `${directions.left}px`);
            }
        });
    } else bubble.style.display = 'none';
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        bubble.style.display = 'block';
    } else bubble.style.display = 'none';
});

sections.forEach(section => {
    observer.observe(section);
});
