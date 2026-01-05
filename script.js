let currentScale = 1;

function isSafeImageSrc(src) {
  if (typeof src !== 'string') {
    return false;
  }
  const trimmed = src.trim();
  if (trimmed === '') {
    return false;
  }
  try {
    const url = new URL(trimmed, window.location.href);
    const isHttp = url.protocol === 'http:' || url.protocol === 'https:';
    const isSameOrigin = url.origin === window.location.origin;
    return isHttp && isSameOrigin;
  } catch (e) {
    // Nieprawidłowy URL traktujemy jako niebezpieczny
    return false;
  }
}


function openModal(imageSrc) {
    const modal = document.getElementById("myModal");
    const modalImage = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImage.src = imageSrc;
    currentScale = 1;
    modalImage.style.transform = `scale(${currentScale})`;
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

document.getElementById('zoomInBtn').addEventListener('click', function(event) {
    event.stopPropagation();
    currentScale += 0.2;
    document.getElementById('modalImage').style.transform = `scale(${currentScale})`;
});

document.getElementById('zoomOutBtn').addEventListener('click', function(event) {
    event.stopPropagation();
    if (currentScale > 0.4) {
        currentScale -= 0.2;
        document.getElementById('modalImage').style.transform = `scale(${currentScale})`;
    }
});

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const closeBtn = document.querySelector('.close-btn');
const modal = document.getElementById('myModal');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.load-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const imageSrc = event.target.getAttribute('data-image-src');
        if (isSafeImageSrc(imageSrc)) {
            openModal(imageSrc)
        }
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}
if (modal) {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}
