document.addEventListener('DOMContentLoaded', function () {

    /* ========================================= */
    /* 1. FUNCIONALIDAD DEL CARRUSEL PRINCIPAL (HERO) */
    /* ========================================= */
    const slides = document.querySelectorAll('.slide-image');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
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

    function startAutoSlide() {
        if (!slideInterval) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = null;
    }

    // Inicialización del Carrusel Principal
    if (slides.length > 1) {
        showSlide(0);
        startAutoSlide();

        // Pausa al pasar el ratón (Recomendado para el Hero)
        const heroContainer = document.querySelector('.hero');
        if (heroContainer) {
            heroContainer.addEventListener('mouseenter', stopAutoSlide);
            heroContainer.addEventListener('mouseleave', startAutoSlide);
        }
    }

    /* ========================================= */
    /* 2. FUNCIONALIDAD DE NAVEGACIÓN Y DROPDOWN (MÓVIL) */
    /* ========================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Funcionalidad de Dropdown en móvil (Activar/Desactivar al hacer clic)
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            // Previene la navegación si es un enlace (#)
            e.preventDefault();
            // Encuentra el contenedor padre
            const parentDropdown = toggle.closest('.dropdown');
            // Muestra/Oculta el submenú
            parentDropdown.classList.toggle('active');
        });
    });


    /* ========================================= */
    /* 3. FUNCIONALIDAD DEL SLIDER DE GALERÍA (INICIALIZACIÓN) */
    /* ========================================= */
    // Llama a las funciones para INICIALIZAR AMBOS SLIDERS de la galería
    sliderLogic(1);
    sliderLogic(2);
    sliderLogic(3);

    /* ========================================= */
    /* 4. FUNCIONALIDAD DEL TÍTULO ROTATORIO (MARQUEE) */
    /* ========================================= */
    const originalTitle = "Vida - Iglesia Cristiana"; // Título base
    const welcomeMessage = "¡Bienvenido a VIDA! 💖"; // Mensaje de bienvenida
    const delaySwitch = 8000; // Tiempo en ms para cambiar de mensaje (8 segundos)
    const scrollSpeed = 200; // Velocidad de desplazamiento en ms

    let isOriginal = true;
    let titleIndex = 0;

    function marqueeTitle() {
        const currentMessage = isOriginal ? welcomeMessage : originalTitle;

        if (titleIndex <= currentMessage.length) {
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

    /* ========================================= */
    /* 5. INICIALIZACIÓN DEL CARRUSEL DE EVENTOS */
    /* ========================================= */
    // LLAMADA CLAVE: Inicializa el carrusel de eventos
    initializeEventsCarousel('eventos-track');

}); // FIN de DOMContentLoaded

// --- Funciones de Carrusel Auxiliares (DEFINIDAS FUERA DE DOMContentLoaded) ---

/* ========================================= */
/* 5.1. FUNCIÓN PRINCIPAL DEL SLIDER DE GALERÍA */
/* ========================================= */

function sliderLogic(sliderId) {
    const track = document.querySelector(`.slider-track[data-slider="${sliderId}"]`);
    if (!track) return;

    const slides = Array.from(track.children);
    // No hacer nada si solo hay una foto o ninguna
    if (slides.length <= 1) return;

    const frame = track.closest('.gallery-slider-frame');
    const nextButton = document.querySelector(`.slider-btn.next[data-slider-target="${sliderId}"]`);
    const prevButton = document.querySelector(`.slider-btn.prev[data-slider-target="${sliderId}"]`);

    let currentIndex = 0;
    const slideCount = slides.length;
    let autoSlideInterval;

    // Función para actualizar la posición del slider (transformación CSS)
    function updateSlider() {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
    }

    // Función para iniciar el avance automático
    function startAutoSlide() {
        if (!autoSlideInterval) {
            autoSlideInterval = setInterval(showNextSlide, 3500); // 3.5 segundos de avance
        }
    }

    // Función para detener el avance automático
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }

    // Event Listeners para Navegación Manual
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            stopAutoSlide(); // Pausa al hacer clic
            showNextSlide();
            startAutoSlide(); // Reinicia el auto-slide
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            stopAutoSlide(); // Pausa al hacer clic
            showPrevSlide();
            startAutoSlide(); // Reinicia el auto-slide
        });
    }

    // Pausar al pasar el ratón (Hover)
    if (frame) {
        frame.addEventListener('mouseenter', stopAutoSlide);
        frame.addEventListener('mouseleave', startAutoSlide);
    }

    // Iniciar el slider
    updateSlider(); // Muestra la primera diapositiva inmediatamente
    startAutoSlide(); // Comienza el avance automático
}

/* ========================================= */
/* 5.5. FUNCIÓN ESPECÍFICA DEL CARRUSEL DE EVENTOS (3 ITEMS POR VISTA) */
/* ========================================= */

function initializeEventsCarousel(trackId) {
    const track = document.getElementById(trackId);
    if (!track) return;

    // Selecciona los ítems individuales que se van a deslizar (carousel-item)
    const items = Array.from(track.children).filter(el => el.classList.contains('carousel-item'));

    // Si hay 3 o menos ítems, no se necesita el carrusel, ya que todos son visibles.
    if (items.length <= 3) return;

    // Obtener los botones de navegación usando su atributo data-target
    const nextButton = document.querySelector(`.carousel-btn.next[data-target="${trackId}"]`);
    const prevButton = document.querySelector(`.carousel-btn.prev[data-target="${trackId}"]`);

    let currentIndex = 0;
    const itemsCount = items.length;
    // Máximo índice al que podemos mover el carrusel sin mostrar espacio en blanco.
    const maxMoveIndex = itemsCount - 3;

    // Función principal para actualizar la posición del carrusel
    function moveToItem(index) {
        // Obtenemos el ancho de un solo ítem (que por CSS es 33.33% del contenedor)
        const itemWidth = items[0].offsetWidth;

        // El movimiento es el índice actual * el ancho de un ítem.
        track.style.transform = `translateX(-${index * itemWidth}px)`;
        currentIndex = index;
    }

    function showNextItem() {
        let newIndex = currentIndex + 1;

        // Restricción: No pasar del último set de 3 ítems visibles
        if (newIndex > maxMoveIndex) {
            newIndex = maxMoveIndex;
        }
        moveToItem(newIndex);
    }

    function showPrevItem() {
        let newIndex = currentIndex - 1;

        // Restricción: No ir antes del primer ítem
        if (newIndex < 0) {
            newIndex = 0;
        }

        moveToItem(newIndex);
    }

    // Event Listeners para Navegación Manual
    if (nextButton) {
        nextButton.addEventListener('click', showNextItem);
    }

    if (prevButton) {
        prevButton.addEventListener('click', showPrevItem);
    }

    // Asegurarse de que el carrusel se reposicione al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
        moveToItem(currentIndex);
    });

    // Inicializar la posición
    moveToItem(currentIndex);
}


/* ========================================= */
/* 6. FUNCIONALIDAD DE MODALES (GLOBAL) */
/* ========================================= */

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
    // Verificamos si el elemento clicado tiene la clase 'modal' (el fondo oscuro)
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}