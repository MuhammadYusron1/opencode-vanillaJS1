// ============================================
// MOBILE NAV TOGGLE
// ============================================
const navbarToggle = document.querySelector('.navbar__toggle');
const navbarMenu = document.querySelector('.navbar__menu');

if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });

    document.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', () => {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.querySelector('.navbar');

const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll();

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// PORTFOLIO FILTER (work.html only)
// ============================================
const filterButtons = document.querySelectorAll('.portfolio__filter');
const portfolioItems = document.querySelectorAll('.portfolio__item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('portfolio__filter--active'));
            button.classList.add('portfolio__filter--active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================
// CONTACT FORM VALIDATION
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const fields = contactForm.querySelectorAll('.contact__field');

        fields.forEach(field => {
            const input = field.querySelector('input, select, textarea');
            const errorEl = field.querySelector('.contact__error');

            field.classList.remove('error');
            if (errorEl) errorEl.textContent = '';

            if (!input.value.trim()) {
                field.classList.add('error');
                if (errorEl) errorEl.textContent = 'This field is required';
                isValid = false;
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                field.classList.add('error');
                if (errorEl) errorEl.textContent = 'Please enter a valid email';
                isValid = false;
            }
        });

        if (isValid) {
            const successMsg = document.querySelector('.contact__success');
            if (successMsg) {
                successMsg.classList.add('show');
                contactForm.reset();
                setTimeout(() => successMsg.classList.remove('show'), 5000);
            }
        }
    });

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.closest('.contact__field').classList.remove('error');
        });
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const revealElements = document.querySelectorAll(
    '.services__card, .work__card, .portfolio__item, .testimonials__card, .contact__info-card'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    revealObserver.observe(el);
});

// ============================================
// FADE IN KEYFRAME (for portfolio filter)
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);