// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    initRevealAnimation();
    initNavbar();
    initHamburgerMenu();
    initCardFlips();
    initGallerySlider();
    initAlumniCarousel();
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
 * Initialize flip animations for sponsor, values, and team cards
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

    // Team cards
    document.querySelectorAll(".team_card_wrapper").forEach(card => {
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

/**
 * Initialize alumni carousel navigation
 */
function initAlumniCarousel() {
    const alumniGrid = document.getElementById("alumniGrid");
    const prevBtn = document.getElementById("alumniBtnPrev");
    const nextBtn = document.getElementById("alumniBtnNext");

    if (!alumniGrid || !prevBtn || !nextBtn) return;

    const cardWidth = 280 + 30; // card width + gap
    const duration = 600; // animation duration in ms
    const cards = [...alumniGrid.querySelectorAll(".alumni_card")];
    const totalCards = cards.length;

    // Clone cards for seamless infinite loop
    // Add clones at the end (forward direction)
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        alumniGrid.appendChild(clone);
    });

    // Add clones at the beginning (backward direction) in correct order
    [...cards].reverse().forEach(card => {
        const clone = card.cloneNode(true);
        alumniGrid.insertBefore(clone, alumniGrid.firstChild);
    });

    // Start at the middle (original cards)
    const originalStart = totalCards * cardWidth;
    const originalEnd = originalStart + (totalCards * cardWidth);
    alumniGrid.scrollLeft = originalStart;

    function smoothScroll(element, scrollAmount, duration) {
        const start = element.scrollLeft;
        const target = start + scrollAmount;
        const distance = scrollAmount;
        const startTime = performance.now();

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function scroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeInOutQuad(progress);
            element.scrollLeft = start + distance * ease;

            if (progress < 1) {
                requestAnimationFrame(scroll);
            } else {
                // After animation completes, check if we need to reset position
                checkAndResetPosition();
            }
        }

        requestAnimationFrame(scroll);
    }

    function checkAndResetPosition() {
        const currentScroll = alumniGrid.scrollLeft;
        
        // If we've scrolled past the forward clones, jump back to original start
        if (currentScroll >= originalEnd) {
            alumniGrid.scrollLeft = originalStart;
        }
        // If we've scrolled before the backward clones, jump back to original end
        else if (currentScroll < originalStart - totalCards * cardWidth) {
            alumniGrid.scrollLeft = originalEnd - cardWidth;
        }
    }

    prevBtn.addEventListener("click", () => {
        smoothScroll(alumniGrid, -cardWidth, duration);
    });

    nextBtn.addEventListener("click", () => {
        smoothScroll(alumniGrid, cardWidth, duration);
    });
}
