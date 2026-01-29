// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    initRevealAnimation();
    initNavbar();
    initHamburgerMenu();
    initCardFlips();
    initGallerySlider();
});

// Handle scroll reveal animations
window.addEventListener("scroll", handleScrollReveal);

/**
 * Initialize reveal animations for elements
 */
function initRevealAnimation() {
    const revealElements = document.querySelectorAll(
        "section, .team_card, .sponsor_card, .about_container, .hero_container, .text_section, img, h2, h3, p"
    );

    revealElements.forEach(el => el.classList.add("reveal"));
    handleScrollReveal(); // Fade in elements already in view
}

/**
 * Fade in navbar on load
 */
function initNavbar() {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        navbar.classList.add("visible");
    }
}

/**
 * Handle hamburger menu toggle and link clicks
 */
function initHamburgerMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        menuToggle.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
            menuToggle.classList.remove("active");
        });
    });
}

/**
 * Initialize flip animations for sponsor and values cards
 */
function initCardFlips() {
    // Sponsor cards
    document.querySelectorAll(".sponsor_card_wrapper").forEach(card => {
        card.addEventListener("click", () => card.classList.toggle("flipped"));
    });

    // Values cards
    document.querySelectorAll(".values_card_wrapper").forEach(card => {
        card.addEventListener("click", () => card.classList.toggle("flipped"));
    });
}

/**
 * Initialize gallery slider navigation
 */
function initGallerySlider() {
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const slide = document.querySelector(".slide");

    if (!prevBtn || !nextBtn || !slide) return;

    prevBtn.addEventListener("click", () => {
        const items = document.querySelectorAll(".item");
        if (items.length) {
            slide.prepend(items[items.length - 1]);
        }
    });

    nextBtn.addEventListener("click", () => {
        const items = document.querySelectorAll(".item");
        if (items.length) {
            slide.append(items[0]);
        }
    });
}

/**
 * Handle scroll reveal: fade in elements when they come into view
 */
function handleScrollReveal() {
    document.querySelectorAll(".reveal").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.classList.add("visible");
        }
    });
}
