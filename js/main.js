// ============================================
// MOBILE NAV TOGGLE - Hamburger menu open/close on mobile
// ============================================
const navbarToggle = document.querySelector('.navbar__toggle');
const navbarMenu = document.querySelector('.navbar__menu');

if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', () => {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });
}

// ============================================
// NAVBAR SCROLL EFFECT - Add 'scrolled' class when page scrolls > 50px
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
handleNavbarScroll(); // Run once on load in case page is already scrolled

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS - Smooth scroll to #id targets
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
// PORTFOLIO FILTER (work.html only) - Filter projects by category
// ============================================
const filterButtons = document.querySelectorAll('.portfolio__filter');
const portfolioItems = document.querySelectorAll('.portfolio__item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('portfolio__filter--active'));
            button.classList.add('portfolio__filter--active');

            const filterValue = button.getAttribute('data-filter');

            // Show/hide items based on category
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
// CONTACT FORM VALIDATION - Validate required fields & email format
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

    // Email format validation helper
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Clear error state on user input
    contactForm.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.closest('.contact__field').classList.remove('error');
        });
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS - Fade-in elements as they enter viewport
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

// Initialize reveal elements with staggered delays
revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    revealObserver.observe(el);
});

// ============================================
// FADE IN KEYFRAME (for portfolio filter) - CSS animation injected via JS
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// ============================================
// DYNAMIC COPYRIGHT YEAR - Auto-update footer year
// ============================================
document.getElementById('currentYear').textContent = new Date().getFullYear();