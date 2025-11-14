/* ========================================= */
/* 1. FUNCIONALIDAD DEL CARRUSEL (HERO) */
/* ========================================= */
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide-image');
    let currentSlide = 0;

    function showSlide(index) {
        // Oculta todas las diapositivas
        slides.forEach((slide, i) => {
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
        });

        // Muestra la diapositiva actual
        slides[index].style.opacity = '1';
        slides[index].style.zIndex = '5'; // Asegura que esté por encima de las otras

        // Actualiza el índice
        currentSlide = index;
    }

    function nextSlide() {
        let newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }

    // Inicializar el carrusel
    if (slides.length > 0) {
        showSlide(0); // Mostrar la primera diapositiva al cargar
        setInterval(nextSlide, 5000); // Cambia la diapositiva cada 5 segundos (5000ms)
    }


    /* ========================================= */
    /* 2. FUNCIONALIDAD DEL MENÚ MÓVIL (TOGGLE) - CORREGIDO */
    /* ========================================= */
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        // SOLAMENTE alternamos la clase 'active'
        nav.classList.toggle('active');

        // Cambia el ícono de la hamburguesa a X (y viceversa)
        if (nav.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Icono de cerrar (X)
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Icono de hamburguesa
        }
    });

    // Ocultar el menú móvil al hacer clic en un enlace (solo en modo móvil)
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
});


/* ========================================= */
/* 3. FUNCIONALIDAD DE MODALES (VENTANAS EMERGENTES) */
/* ========================================= */

// Función para abrir cualquier modal por su ID
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Función para cerrar cualquier modal por su ID
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
