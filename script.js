document.addEventListener('DOMContentLoaded', function () {

    /* ========================================= */
    /* 1. NAVEGACIÓN, HAMBURGUESA Y SUBMENÚS     */
    /* ========================================= */
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');

    if (header && !document.querySelector('.hamburger')) {
        const hamburger = document.createElement('div');
        hamburger.classList.add('hamburger');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        header.appendChild(hamburger);

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = "rotate(45deg) translate(5px, 6px)";
                spans[1].style.opacity = "0";
                spans[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
            } else {
                spans.forEach(s => s.style.transform = "none");
                spans[1].style.opacity = "1";
            }
        });
    }

    const toggles = document.querySelectorAll('.dropdown-toggle, .submenu-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                e.stopPropagation();
                const parent = this.parentElement;
                const isActive = parent.classList.contains('active');
                const siblings = parent.parentElement.querySelectorAll(':scope > .dropdown, :scope > .dropdown-submenu');
                siblings.forEach(sib => sib.classList.remove('active'));
                if (!isActive) parent.classList.add('active');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (nav && !nav.contains(e.target)) {
            nav.classList.remove('active');
            document.querySelectorAll('.dropdown, .dropdown-submenu').forEach(el => el.classList.remove('active'));
            const spans = document.querySelectorAll('.hamburger span');
            if (spans.length) {
                spans.forEach(s => s.style.transform = "none");
                spans[1].style.opacity = "1";
            }
        }
    });

    /* ========================================= */
    /* 2. CARRUSEL 3D - DECLARACIÓN DE FE        */
    /* ========================================= */
    const feCards = document.querySelectorAll('.fe-card');
    const feNextBtn = document.querySelector('.fe-next');
    const fePrevBtn = document.querySelector('.fe-prev');
    let feIndex = 0;

    if (feCards.length > 0) {
        function updateFeCarousel() {
            feCards.forEach((card, i) => {
                card.classList.remove('active', 'prev', 'next', 'hide');
                if (i === feIndex) {
                    card.classList.add('active');
                } else if (i === (feIndex - 1 + feCards.length) % feCards.length) {
                    card.classList.add('prev');
                } else if (i === (feIndex + 1) % feCards.length) {
                    card.classList.add('next');
                } else {
                    card.classList.add('hide');
                }
            });
        }

        if (feNextBtn) {
            feNextBtn.addEventListener('click', () => {
                feIndex = (feIndex + 1) % feCards.length;
                updateFeCarousel();
            });
        }

        if (fePrevBtn) {
            fePrevBtn.addEventListener('click', () => {
                feIndex = (feIndex - 1 + feCards.length) % feCards.length;
                updateFeCarousel();
            });
        }

        setInterval(() => {
            feIndex = (feIndex + 1) % feCards.length;
            updateFeCarousel();
        }, 5000);

        updateFeCarousel();
    }

    /* ========================================= */
    /* 3. CARRUSEL HERO (IMÁGENES FONDO)         */
    /* ========================================= */
    const slides = document.querySelectorAll('.slide-image');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide) => {
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
        });
        if (slides[index]) {
            slides[index].style.opacity = '1';
            slides[index].style.zIndex = '5';
            currentSlide = index;
        }
    }

    function startAutoSlide() {
        if (!slideInterval && slides.length > 1) {
            slideInterval = setInterval(() => {
                showSlide((currentSlide + 1) % slides.length);
            }, 5000);
        }
    }

    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();
        const heroContainer = document.querySelector('.hero');
        if (heroContainer) {
            heroContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
                slideInterval = null;
            });
            heroContainer.addEventListener('mouseleave', startAutoSlide);
        }
    }

    /* ========================================= */
    /* 4. TÍTULO ANIMADO Y OTROS SLIDERS         */
    /* ========================================= */
    const originalTitle = "Vida - Iglesia Cristiana";
    let titleIndex = 0;
    setInterval(() => {
        document.title = originalTitle.substring(titleIndex) + " | " + originalTitle.substring(0, titleIndex);
        titleIndex = (titleIndex + 1) % originalTitle.length;
    }, 200);

    sliderLogic(1);
    sliderLogic(2);
    sliderLogic(3);
    initializeEventsCarousel('eventos-track');
});

/* ========================================= */
/* FUNCIONES FUERA DEL DOMCONTENTLOADED      */
/* ========================================= */

function sliderLogic(sliderId) {
    const track = document.querySelector(`.slider-track[data-slider="${sliderId}"]`);
    if (!track) return;
    const slides = Array.from(track.children);
    let currentIndex = 0;
    setInterval(() => {
        if (slides.length > 1) {
            currentIndex = (currentIndex + 1) % slides.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }, 3500);
}

/**
 * Lógica mejorada para el Carrusel de Eventos con botones funcionales
 */
function initializeEventsCarousel(trackId) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const items = track.children;
    const container = track.closest('.events-carousel');
    const nextBtn = container.querySelector('.next');
    const prevBtn = container.querySelector('.prev');
    let index = 0;

    function moveCarousel() {
        const visibleItems = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 992 ? 2 : 3);
        const maxIndex = Math.max(0, items.length - visibleItems);

        if (index > maxIndex) index = 0;
        if (index < 0) index = maxIndex;

        const width = items[0].offsetWidth;
        track.style.transform = `translateX(-${index * width}px)`;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            index++;
            moveCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            index--;
            moveCarousel();
        });
    }

    // Auto-desplazamiento cada 5 segundos
    let autoPlay = setInterval(() => {
        index++;
        moveCarousel();
    }, 5000);

    // Pausar al pasar el mouse
    container.addEventListener('mouseenter', () => clearInterval(autoPlay));
    container.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            index++;
            moveCarousel();
        }, 5000);
    });

    window.addEventListener('resize', moveCarousel);
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

// Cerrar modales al hacer clic fuera
window.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }

});