/**
 * Kajotte Studio - Image Modal & UI Logic
 * Czysty JavaScript bez zewnętrznych bibliotek
 */

let currentScale = 1;

/**
 * Funkcja weryfikująca bezpieczeństwo adresu URL obrazu
 */
function isSafeImageSrc(src) {
    if (typeof src !== 'string') return null;
    
    const trimmed = src.trim();
    if (trimmed === '') return null;

    try {
        const url = new URL(trimmed, window.location.href);
        const isHttp = url.protocol === 'http:' || url.protocol === 'https:';
        const isSameOrigin = url.origin === window.location.origin;
        const isNasa = url.hostname === 'sdo.gsfc.nasa.gov' || url.hostname === 'soho.nascom.nasa.gov';
        
        if (isHttp && (isSameOrigin || isNasa)) {
            return url.href;
        }
        return null;
    } catch (e) {
        return null;
    }
}

/**
 * Logika Modala
 */
const modal = document.getElementById("myModal");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.querySelector('.close-btn');

function openModal(imageSrc) {
    if (!modal || !modalImage) return;

    modal.style.display = "block";
    modalImage.src = imageSrc;
    
    // Resetowanie skali i pozycji przewijania przy każdym otwarciu
    currentScale = 1;
    updateZoom();
    modal.scrollTop = 0;
    modal.scrollLeft = 0;
    
    // Zapobiegaj przewijaniu strony w tle pod modalem
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflow = ''; // Przywróć przewijanie strony
}

function updateZoom() {
    if (modalImage) {
        modalImage.style.transform = `scale(${currentScale})`;
    }
}

/**
 * Event Listeners - Zoom
 */
document.getElementById('zoomInBtn')?.addEventListener('click', (event) => {
    event.stopPropagation();
    currentScale += 0.2;
    updateZoom();
});

document.getElementById('zoomOutBtn')?.addEventListener('click', (event) => {
    event.stopPropagation();
    if (currentScale > 0.4) {
        currentScale -= 0.2;
        updateZoom();
    }
});

/**
 * Event Listeners - Nawigacja i Interakcje
 */

// Zamykanie modala przyciskiem
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Zamykanie modala po kliknięciu w tło (backdrop)
if (modal) {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Obsługa przycisków ładujących zdjęcia
document.querySelectorAll('.load-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const imageSrc = event.target.getAttribute('data-image-src');
        const safeImageSrc = isSafeImageSrc(imageSrc);
        if (safeImageSrc) {
            openModal(safeImageSrc);
        }
    });
});

/**
 * Menu Mobilne
 */
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });
}

// Obsługa klawisza ESC dla wygody użytkownika
document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});