document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');

    // --- LÓGICA DEL MENÚ MÓVIL ---
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
            }
        });
    });

    // --- LÓGICA DEL CARRUSEL DE FONDO ---
    const slides = document.querySelectorAll('.slide-image');
    let currentSlide = 0;
    // Tiempo de transición de 1.5s (CSS) + 4.5s de pausa = 6 segundos total
    const intervalTime = 6000;

    function showSlide(index) {
        if (slides.length === 0) return;

        // 1. Ocultar todas las slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // 2. Mostrar la slide actual
        slides[index].classList.add('active');
    }

    function nextSlide() {
        // Mueve al siguiente slide, o vuelve al primero si llega al final
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Inicializar el carrusel
    if (slides.length > 0) {
        showSlide(currentSlide);
        // Configurar el temporizador para la rotación automática
        setInterval(nextSlide, intervalTime);
    }
});