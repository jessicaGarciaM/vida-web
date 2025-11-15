document.addEventListener('DOMContentLoaded', function () {

    /* ========================================= */
    /* 1. FUNCIONALIDAD DEL CARRUSEL PRINCIPAL (HERO) */
    /* ========================================= */
    const slides = document.querySelectorAll('.slide-image');
    let currentSlide = 0;

    function showSlide(index) {
        // Oculta todas las diapositivas con baja opacidad
        slides.forEach((slide, i) => {
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
        });

        // Muestra la diapositiva actual y la pone al frente
        slides[index].style.opacity = '1';
        slides[index].style.zIndex = '5';
        currentSlide = index;
    }

    function nextSlide() {
        let newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }

    // Inicializar el carrusel y establecer el temporizador
    if (slides.length > 0) {
        showSlide(0);
        setInterval(nextSlide, 5000);
    }


    /* ========================================= */
    /* 2. FUNCIONALIDAD DEL MENÚ MÓVIL (CORRECCIÓN) */
    /* ========================================= */
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        // AÑADE o REMUEVE la clase 'active' para mostrar/ocultar el menú
        nav.classList.toggle('active');

        // Cambia el ícono (hamburguesa <-> X)
        if (nav.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Cierra el menú móvil al hacer clic en un enlace
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Cierra el menú si se redimensiona la ventana a escritorio
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });


    /* ========================================= */
    /* 3. FUNCIONALIDAD DE LOS 3 CAROUSELES DE FOTOS */
    /* ========================================= */

    function setupSlider(sliderId) {
        const track = document.querySelector(`.slider-track[data-slider="${sliderId}"]`);

        // Verifica que el track exista
        if (!track) return;

        const slides = Array.from(track.children);

        // No hacer nada si solo hay una foto o ninguna
        if (slides.length <= 1) return;

        const nextButton = document.querySelector(`.slider-btn.next[data-slider-target="${sliderId}"]`);
        const prevButton = document.querySelector(`.slider-btn.prev[data-slider-target="${sliderId}"]`);

        let currentIndex = 0;
        const slideCount = slides.length;

        // Función para actualizar la posición del slider (transformación CSS)
        function updateSlider() {
            const offset = -currentIndex * 100;
            track.style.transform = `translateX(${offset}%)`;
        }

        // Navegación a la siguiente diapositiva
        function showNextSlide() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateSlider();
        }

        // Navegación a la diapositiva anterior
        function showPrevSlide() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSlider();
        }

        // Event Listeners para los botones
        if (nextButton) nextButton.addEventListener('click', showNextSlide);
        if (prevButton) prevButton.addEventListener('click', showPrevSlide);

        // Auto-slide para que se muevan automáticamente
        setInterval(showNextSlide, 4000); // Cambia cada 4 segundos
    }

    // Inicializar los 3 sliders de fotos
    setupSlider(1);
    setupSlider(2);
    setupSlider(3);

}); // FIN de DOMContentLoaded


/* ========================================= */
/* 4. FUNCIONALIDAD DE MODALES (GLOBAL) */
/* ========================================= */

// NOTA: Estas funciones están fuera de DOMContentLoaded para que sean accesibles desde
// los atributos onclick="..." del HTML.

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Cerrar el modal haciendo clic fuera de su contenido
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
