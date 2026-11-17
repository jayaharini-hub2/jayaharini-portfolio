
/*
    Portfolio JavaScript

    We will add interactive features here,
    using only Vanilla JavaScript (ES6+).

    The Hero Section currently uses CSS
    for its entrance animations.
*/
// ==========================================
// FAMILY IMAGE VIEWER
// ==========================================

const familyImages = document.querySelectorAll(".family-image img");

const imageViewer = document.getElementById("imageViewer");
const viewerImage = document.getElementById("viewerImage");
const viewerClose = document.getElementById("viewerClose");

// Open image
familyImages.forEach((image) => {
    image.addEventListener("click", () => {
        viewerImage.src = image.src;
        viewerImage.alt = image.alt;

        imageViewer.classList.add("active");
    });
});

// Close image
viewerClose.addEventListener("click", () => {
    imageViewer.classList.remove("active");
});

// Close when clicking outside image
imageViewer.addEventListener("click", (event) => {
    if (event.target === imageViewer) {
        imageViewer.classList.remove("active");
    }
});

// Close using Escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        imageViewer.classList.remove("active");
    }
});


/* ==========================================
   GOLDEN THREAD EXPERIENCE
========================================== */

// Get progress elements
const threadProgress = document.getElementById("threadProgress");
const threadFill = document.getElementById("threadFill");
const threadGlow = document.getElementById("threadGlow");

// Get chapter elements
const chapterNumber = document.getElementById("chapterNumber");
const chapterName = document.getElementById("chapterName");

// Portfolio chapters
const portfolioChapters = [
    { id: "home", name: "THE BEGINNING" },
    { id: "journey", name: "MY JOURNEY" },
    { id: "about", name: "BEYOND THE PROFILE" },
    { id: "interests", name: "BEYOND WORK" },
    { id: "achievements", name: "MILESTONES" },
    { id: "family", name: "MY PEOPLE" },
    { id: "hobbies", name: "MY WORLD" },
    { id: "footer", name: "THE JOURNEY CONTINUES" }
];

// Find sections that actually exist on the page
const availableChapters = portfolioChapters
    .map(chapter => ({
        ...chapter,
        element: document.getElementById(chapter.id)
    }))
    .filter(chapter => chapter.element);

// Cache navigation links
const navigationLinks = document.querySelectorAll(
    ".nav-links a[href^='#']"
);

// Update the golden thread progress
function updateThreadProgress() {

    if (!threadProgress || !threadFill || !threadGlow) {
        return;
    }

    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollAmount = window.scrollY;

    const progress = documentHeight > 0
        ? Math.min(100, Math.max(0,
            (scrollAmount / documentHeight) * 100))
        : 0;

    const progressScale = progress / 100;

    threadFill.style.transform = `scaleX(${progressScale})`;
    threadGlow.style.left = `${progress}%`;

    threadProgress.setAttribute(
        "aria-valuenow",
        Math.round(progress)
    );
}

// Update the current chapter
function updateCurrentChapter(chapter) {

    if (!chapterNumber || !chapterName) {
        return;
    }

    const chapterIndex = availableChapters.indexOf(chapter);

    chapterNumber.textContent =
        String(chapterIndex + 1).padStart(2, "0");

    chapterName.textContent = chapter.name;

    // Highlight the corresponding navigation link
    navigationLinks.forEach(link => {

        const isActive =
            link.getAttribute("href") === `#${chapter.id}`;

        if (isActive) {
            link.classList.add("active");
            link.setAttribute("aria-current", "location");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }

    });
}

// Observe sections to identify the current chapter
if ("IntersectionObserver" in window && availableChapters.length) {

    const chapterObserver = new IntersectionObserver(
        entries => {

            const visibleEntries = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) =>
                    b.intersectionRatio - a.intersectionRatio
                );

            if (visibleEntries.length > 0) {

                const currentElement = visibleEntries[0].target;

                const currentChapter = availableChapters.find(
                    chapter => chapter.element === currentElement
                );

                if (currentChapter) {
                    updateCurrentChapter(currentChapter);
                }

            }

        },
        {
            root: null,
            rootMargin: "-20% 0px -55% 0px",
            threshold: [0, 0.15, 0.35, 0.6]
        }
    );

    availableChapters.forEach(chapter => {
        chapterObserver.observe(chapter.element);
    });

} else if (availableChapters.length) {

    updateCurrentChapter(availableChapters[0]);

}

// Scroll progress updates
let threadTicking = false;

function requestThreadUpdate() {

    if (!threadTicking) {

        window.requestAnimationFrame(() => {
            updateThreadProgress();
            threadTicking = false;
        });

        threadTicking = true;
    }
}

window.addEventListener("scroll", requestThreadUpdate, {
    passive: true
});

window.addEventListener("resize", requestThreadUpdate);

updateThreadProgress();

// ==========================================
// EXPRESSIVE SCROLL REVEAL ANIMATIONS
// ==========================================

const revealSelectors = [
    ".hero-content",
    ".hero-visual",
    ".section-heading",
    ".journey-heading",
    ".journey-card",
    ".about-content",
    ".about-qualities",
    ".about-highlight",
    ".interests-section .interest-card",
    ".achievements-section .achievement-card",
    ".family-section .family-member",
    ".hobbies-section .hobby-item",
    ".footer-content",
    ".footer-bottom"
];

const revealElements = document.querySelectorAll(
    revealSelectors.join(", ")
);

// Add staggered animation delays
revealElements.forEach((element, index) => {

    const delay = (index % 4) * 120;

    element.style.setProperty(
        "--thread-delay",
        `${delay}ms`
    );

    element.classList.add("thread-reveal");

});

// Separate image reveals
const revealImages = document.querySelectorAll(
    ".achievement-image, .family-image, .interest-card img, .hero-visual img"
);

revealImages.forEach((image, index) => {

    image.style.setProperty(
        "--thread-delay",
        `${(index % 3) * 150}ms`
    );

    image.classList.add("thread-image-reveal");

});

// Observe reveal elements
if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    document.querySelectorAll(
        ".thread-reveal, .thread-image-reveal"
    ).forEach(element => {
        revealObserver.observe(element);
    });

} else {

    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll(
        ".thread-reveal, .thread-image-reveal"
    ).forEach(element => {
        element.classList.add("is-visible");
    });

}
