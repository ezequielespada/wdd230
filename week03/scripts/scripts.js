document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("img[data-src]");

    const loadImage = (image) => {
        image.src = image.getAttribute("data-src");
        image.onload = () => image.classList.add("loaded");
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    images.forEach(img => observer.observe(img));

    // Última modificación del documento
    document.getElementById("lastModified").textContent = document.lastModified;
});
