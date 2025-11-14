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
    /* 2. FUNCIONALIDAD DEL MENÚ MÓVIL (TOGGLE) */
    /* ========================================= */
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        // Alterna la clase 'active' para controlar la visibilidad y el estilo de la navegación
        nav.classList.toggle('active');

        // Cambia el ícono de la hamburguesa a X (y viceversa)
        if (nav.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Icono de cerrar (X)
            // Aplica estilos de menú abierto para móvil (se define en el CSS)
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '70px'; // Debajo del header
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.backgroundColor = 'var(--text-light)'; // Fondo blanco
            nav.style.boxShadow = 'var(--shadow-medium)';
            nav.style.padding = '10px 0';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Icono de hamburguesa
            nav.style.display = 'none';
        }
    });

    // Ocultar el menú móvil al hacer clic en un enlace (solo en modo móvil)
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            // Si el menú está activo (modo móvil), lo oculta después de hacer clic
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                nav.style.display = 'none';
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

// Nota: Debes añadir el contenido completo y los cierres de cada modal
// en tu archivo HTML para que esta funcionalidad trabaje completamente.
