document.addEventListener('DOMContentLoaded', function () {

    /* ========================================= */
    /* 1. FUNCIONALIDAD DEL CARRUSEL PRINCIPAL (HERO) */
    /* ========================================= */
    const slides = document.querySelectorAll('.slide-image');
    const heroContainer = document.querySelector('.hero'); // Añadido: Contenedor principal del carrusel (ajústalo al selector de tu HTML si es diferente)
    let currentSlide = 0;
    let slideInterval; // Añadido: Variable para almacenar el ID del intervalo

    function showSlide(index) {
        // ... (Tu código original para mostrar la diapositiva)
        slides.forEach((slide, i) => {
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
        });

        slides[index].style.opacity = '1';
        slides[index].style.zIndex = '5';
        currentSlide = index;
    }

    function nextSlide() {
        let newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }

    // Función para iniciar el avance automático
    function startAutoSlide() {
        // Solo iniciar si no está ya corriendo
        if (!slideInterval) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    }

    // Función para detener el avance automático
    function stopAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = null;
    }

    // Inicializar el carrusel y establecer el temporizador
    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide(); // Inicia el carrusel al cargar

        // *******************************************
        // * NUEVA FUNCIONALIDAD: Pausar al Hover *
        // *******************************************
        if (heroContainer) {
            // Pausar al pasar el ratón (mouseenter)
            heroContainer.addEventListener('mouseenter', stopAutoSlide);

            // Reanudar al quitar el ratón (mouseleave)
            heroContainer.addEventListener('mouseleave', startAutoSlide);
        }
    }


    /* ========================================= */
    /* 2. FUNCIONALIDAD DEL MENÚ MÓVIL */
    /* ========================================= */
    // ... (El resto de tu código, sin cambios)
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
        let autoSlideInterval; // Variable para controlar el intervalo del slider de fotos

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

        // Iniciar auto-slide
        function startPhotoAutoSlide() {
            if (!autoSlideInterval) {
                autoSlideInterval = setInterval(showNextSlide, 4000); // Cambia cada 4 segundos
            }
        }

        // Detener auto-slide
        function stopPhotoAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }

        // Event Listeners para los botones
        if (nextButton) nextButton.addEventListener('click', showNextSlide);
        if (prevButton) prevButton.addEventListener('click', showPrevSlide);

        // *******************************************
        // * NUEVA FUNCIONALIDAD: Pausar al Hover en la galería *
        // *******************************************
        track.closest('.slider-container').addEventListener('mouseenter', stopPhotoAutoSlide);
        track.closest('.slider-container').addEventListener('mouseleave', startPhotoAutoSlide);


        // Iniciar el auto-avance
        startPhotoAutoSlide();
    }

    // Inicializar los 3 sliders de fotos
    setupSlider(1);
    setupSlider(2);
    setupSlider(3);


    /* ========================================= */
    /* 5. CORRECCIÓN: APERTURA DEL MODAL (DESACTIVACIÓN AUTOMÁTICA) */
    /* ========================================= */

    // **IMPORTANTE:** Este bloque queda vacío.


    /* ========================================= */
    /* 6. EFECTO DE TÍTULO DESLIZANTE (MARQUEE TITLE) */
    /* ========================================= */

    const originalTitle = "Vida - Iglesia Cristiana";
    const marqueeMessage = "¡Bienvenido a la iglesia Vida!";

    let isOriginal = true;
    let titleIndex = 0;
    const scrollSpeed = 300; // Velocidad del desplazamiento en milisegundos
    const delaySwitch = 4000; // Tiempo para cambiar de mensaje

    function marqueeTitle() {
        const currentMessage = isOriginal ? originalTitle : marqueeMessage;

        if (titleIndex < currentMessage.length) {
            // Desplaza el título mostrando una subcadena que avanza
            document.title = currentMessage.substring(titleIndex, currentMessage.length) + " | " + currentMessage.substring(0, titleIndex);
            titleIndex++;
        } else {
            // Al finalizar el desplazamiento, espera un momento y cambia al siguiente mensaje
            setTimeout(() => {
                isOriginal = !isOriginal; // Cambia entre original y el mensaje de bienvenida
                titleIndex = 0; // Reinicia el índice
            }, delaySwitch);
        }
    }

    // Inicia el ciclo de desplazamiento solo si el título original está presente
    if (document.title.includes(originalTitle)) {
        setInterval(marqueeTitle, scrollSpeed);
    }


}); // FIN de DOMContentLoaded


/* ========================================= */
/* 4. FUNCIONALIDAD DE MODALES (GLOBAL) */
/* ========================================= */

// NOTA: Estas funciones son las que usas en el HTML con onclick="openModal('ID_DEL_MODAL')".

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
    // Verificamos si el elemento clicado tiene la clase 'modal'
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}