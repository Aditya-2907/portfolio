/* ============================================================
   PORTFOLIO — Aditya
   main.js — All interactive behaviour

   Sections:
   1. Navbar scroll effect & active link
   2. Mobile menu toggle
   3. Scroll animations (IntersectionObserver)
   4. Contact form handler
   5. Back to top button
   6. Footer year
   7. Init
============================================================ */

'use strict';

/* ============================================================
   1. NAVBAR — scroll effect & active link highlighting
============================================================ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function handleNavbarScroll() {
    // Add scrolled class once user scrolls past 60px
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Highlight the active nav link based on scroll position
    let currentSectionId = '';
    const scrollMid = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollMid >= sectionTop && scrollMid < sectionBottom) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

/* ============================================================
   2. MOBILE MENU TOGGLE
============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeMobileMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function toggleMobileMenu() {
    if (hamburger.classList.contains('open')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when any nav link is clicked
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu on Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) {
        closeMobileMenu();
    }
});

/* ============================================================
   3. SCROLL ANIMATIONS — IntersectionObserver for fade-up
============================================================ */
const fadeElements = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once visible, unobserve to save memory
                fadeObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,       // Trigger when 12% of element is visible
        rootMargin: '0px 0px -40px 0px' // Small offset from bottom
    }
);

fadeElements.forEach(el => fadeObserver.observe(el));

// Immediately make hero elements visible (they're above fold)
const heroFadeElements = document.querySelectorAll('.hero .fade-up');
setTimeout(() => {
    heroFadeElements.forEach(el => el.classList.add('visible'));
}, 100);

/* ============================================================
   4. CONTACT FORM HANDLER
============================================================ */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        // Basic validation
        if (!name || !email || !message) {
            showFormNote('Please fill in all required fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormNote('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... <i class="ph ph-circle-notch"></i>';
        submitBtn.disabled = true;

        // Simulate send delay (replace with real fetch/formspree/emailjs call)
        await new Promise(resolve => setTimeout(resolve, 1400));

        // Success
        showFormNote('✓ Message sent! I\'ll reply within 24 hours.', 'success');
        contactForm.reset();

        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Clear note after 6 seconds
        setTimeout(() => {
            if (formNote) formNote.textContent = '';
        }, 6000);
    });
}

function showFormNote(message, type) {
    if (!formNote) return;
    formNote.textContent = message;
    formNote.className = `form-note ${type}`;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ============================================================
   5. BACK TO TOP BUTTON
============================================================ */
const backToTopBtn = document.getElementById('backToTop');

function handleBackToTop() {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ============================================================
   6. FOOTER YEAR — auto-update copyright year
============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

/* ============================================================
   7. INIT — Wire up all scroll listeners
============================================================ */
window.addEventListener('scroll', () => {
    handleNavbarScroll();
    handleBackToTop();
}, { passive: true }); // passive improves scroll performance

// Run once on load to set initial states
handleNavbarScroll();
handleBackToTop();

// Smooth scroll polyfill for older browsers
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});