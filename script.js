/**
 * Kajotte Studio - Pro Zoom Solution
 */

let currentScale = 1;
const SCALE_STEP = 0.3;

// --- Funkcja bezpieczeństwa (Twoja oryginalna) ---
function isSafeImageSrc(src) {
    if (typeof src !== 'string') return null;
    const trimmed = src.trim();
    if (trimmed === '') return null;
    try {
        const url = new URL(trimmed, window.location.href);
        const isHttp = url.protocol === 'http:' || url.protocol === 'https:';
        const isSameOrigin = url.origin === window.location.origin;
        const isNasa = url.hostname === 'sdo.gsfc.nasa.gov' || url.hostname === 'soho.nascom.nasa.gov';
        return (isHttp && (isSameOrigin || isNasa)) ? url.href : null;
    } catch (e) { return null; }
}

const modal = document.getElementById("myModal");
const modalImage = document.getElementById("modalImage");

function updateZoom() {
    if (modalImage) {
        // Używamy transform: scale, ale w połączeniu z odpowiednim CSS (patrz niżej)
        // To pozwala na płynność i nie "psuje" układu strony
        modalImage.style.transform = `scale(${currentScale})`;
    }
}

function openModal(imageSrc) {
    if (!modal || !modalImage) return;

    modal.style.display = "block";
    modalImage.src = imageSrc;
    
    currentScale = 1;
    updateZoom();
    
    // Reset pozycji przewijania na środek/górę
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

// --- Event Listeners ---

document.getElementById('zoomInBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentScale += SCALE_STEP;
    updateZoom();
});

document.getElementById('zoomOutBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentScale > 0.4) {
        currentScale -= SCALE_STEP;
        updateZoom();
    }
});

document.querySelector('.close-btn')?.addEventListener('click', closeModal);

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

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

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
});