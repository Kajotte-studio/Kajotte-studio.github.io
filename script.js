/* -------------------------- */
/*      Kajotte Studio        */
/* -------------------------- */

let currentScale = 1;

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

const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modalImage");

function openModal(imageSrc) {
    if (!modal || !modalImg) return;
    modal.style.display = "block";
    modalImg.src = imageSrc;
    currentScale = 1;
    modalImg.style.width = "90%";
    modal.scrollTop = 0;
    modal.scrollLeft = 0;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = '';
}

function changeZoom(delta) {
    currentScale += delta;
    if (currentScale < 0.5) currentScale = 0.5;
    modalImg.style.width = (currentScale * 90) + "%";
}

document.getElementById('zoomInBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    changeZoom(0.3);
});

document.getElementById('zoomOutBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    changeZoom(-0.3);
});

document.querySelector('.close-btn')?.addEventListener('click', closeModal);

modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.querySelectorAll('.load-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const safe = isSafeImageSrc(e.target.getAttribute('data-image-src'));
        if (safe) openModal(safe);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
});