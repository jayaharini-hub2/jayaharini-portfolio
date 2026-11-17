
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