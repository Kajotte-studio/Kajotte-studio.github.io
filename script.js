/* -------------------------- */
/*      Kajotte Studio        */
/* -------------------------- */

let currentScale = 1;

function isSafeImageSrc(src) {
    if (typeof src !== 'string') return null;
    try {
        const url = new URL(src.trim(), window.location.href);
        const isHttp = url.protocol === 'http:' || url.protocol === 'https:';
        const isSameOrigin = url.origin === window.location.origin;
        const isNasa = url.hostname.includes('nasa.gov');
        return (isHttp && (isSameOrigin || isNasa)) ? url.href : null;
    } catch (e) { return null; }
}

const modal = document.getElementById("myModal");
const modalImage = document.getElementById("modalImage");

function openModal(imageSrc) {
    if (!modal || !modalImage) return;

    // Używamy FLEX, aby margin: auto na obrazku działało poprawnie
    modal.style.display = "flex"; 
    modalImage.src = imageSrc;
    
    currentScale = 1;
    modalImage.style.transform = `scale(${currentScale})`;
    
    // Reset scrolla
    modal.scrollTop = 0;
    modal.scrollLeft = 0;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = '';
    }
}

// Obsługa Zoomu
document.getElementById('zoomInBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentScale += 0.3;
    modalImage.style.transform = `scale(${currentScale})`;
});

document.getElementById('zoomOutBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentScale > 0.4) {
        currentScale -= 0.3;
        modalImage.style.transform = `scale(${currentScale})`;
    }
});

// Zamykanie
document.querySelector('.close-btn')?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// Ładowanie obrazków
document.querySelectorAll('.load-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const src = e.target.getAttribute('data-image-src');
        const safeSrc = isSafeImageSrc(src);
        if (safeSrc) openModal(safeSrc);
    });
});

// Menu mobilne
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });
}

document.addEventListener('keydown', (e) => { if (e.key === "Escape") closeModal(); });