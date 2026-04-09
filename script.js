/* -------------------------- */
/*      Kajotte Studio        */
/* -------------------------- */

let currentScale = 1.0;

function isSafeImageSrc(src) {
    if (typeof src !== 'string') return null;
    try {
        const url = new URL(src.trim(), window.location.href);
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

const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modalImage");

function openModal(imageSrc) {
    if (!modal || !modalImg) return;
    modal.style.display = "block";
    modalImg.src = imageSrc;
    currentScale = 1.0;
    modalImg.style.width = "90%";
    modalImg.style.maxWidth = "90%";
    modal.scrollTop = 0;
    modal.scrollLeft = 0;
    document.body.style.overflow = 'hidden';
}

function updateZoom(delta) {
    currentScale += delta;
    if (currentScale < 0.5) currentScale = 0.5;
    modalImg.style.maxWidth = "none";
    modalImg.style.width = (currentScale * 90) + "%";
}

document.getElementById('zoomInBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateZoom(0.3);
});

document.getElementById('zoomOutBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateZoom(-0.3);
});

function closeModal() {
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = '';
    }
}

document.querySelector('.close-btn')?.addEventListener('click', closeModal);

modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.querySelectorAll('.load-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const safe = isSafeImageSrc(e.target.getAttribute('data-image-src'));
        if (safe) openModal(safe);
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

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
});