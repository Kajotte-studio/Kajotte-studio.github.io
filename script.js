/* -------------------------- */
/*      Kajotte Studio        */
/* -------------------------- */

let currentScale = 1.0;
const SCALE_STEP = 0.2;

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

function updateImageSize() {
    if (modalImage) {
        const newWidth = currentScale * 90;
        modalImage.style.maxWidth = "none"; 
        modalImage.style.width = newWidth + "vw";
    }
}

function openModal(imageSrc) {
    if (!modal || !modalImage) return;

    modal.style.display = "block";
    modalImage.src = imageSrc;
    
    currentScale = 1.0;
    modalImage.style.width = "90vw";
    modalImage.style.maxWidth = "90vw";
    
    document.body.style.overflow = 'hidden'; // Blokada scrolla strony
    modal.scrollTop = 0;
    modal.scrollLeft = 0;
}

function closeModal() {
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = '';
    }
}

document.getElementById('zoomInBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentScale += SCALE_STEP;
    updateImageSize();
});

document.getElementById('zoomOutBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentScale > 0.4) {
        currentScale -= SCALE_STEP;
        updateImageSize();
    }
});

document.querySelector('.close-btn')?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

document.querySelectorAll('.load-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const safeSrc = isSafeImageSrc(e.target.getAttribute('data-image-src'));
        if (safeSrc) openModal(safeSrc);
    });
});

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