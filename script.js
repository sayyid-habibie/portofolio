let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Active nav link on scroll
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            let activeLink = document.querySelector('header nav a[href="#' + id + '"]');
            if (activeLink) activeLink.classList.add('active');
        }
    });

    // Sticky header shadow
    let header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
};

// Mobile menu toggle
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Close navbar when a nav link is clicked (mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger delay for multiple elements
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            fill.style.width = fill.dataset.width + '%';
            skillObserver.unobserve(fill);
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ===== CONTACT FORM → WHATSAPP =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name    = document.getElementById('contact-name').value.trim();
        const email   = document.getElementById('contact-email').value.trim();
        const phone   = document.getElementById('contact-phone').value.trim();
        const subject = document.getElementById('contact-subject').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        const text = 
`Halo Abib! 👋

*Nama:* ${name}
*Email:* ${email}${phone ? `\n*No. HP:* ${phone}` : ''}
*Subject:* ${subject}

*Pesan:*
${message}`;

        const waNumber = window._waNumber || '6281382897508';
        const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
        window.open(waURL, '_blank');

        contactForm.reset();
    });
}
