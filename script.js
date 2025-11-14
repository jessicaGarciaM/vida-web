/* ========================================= */
/* 1. FUNCIONALIDAD DEL CARRUSEL (HERO) */
/* ========================================= */
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide-image');
    let currentSlide = 0;

    function showSlide(index) {
        // Asegura que las imágenes se superpongan y cambien de opacidad
        slides.forEach((slide, i) => {
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
        });

        // Muestra la diapositiva actual
        slides[index].style.opacity = '1';
        slides[index].style.zIndex = '5'; 

        // Actualiza el índice
        currentSlide = index;
    }

    function nextSlide() {
        let newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }

    // Inicializar el carrusel y establecer el temporizador
    if (slides.length > 0) {
        showSlide(0); 
        // Cambia la diapositiva cada 5 segundos
        setInterval(nextSlide, 5000); 
    }


    /* ========================================= */
    /* 2. FUNCIONALIDAD DEL MENÚ MÓVIL (CORREGIDO) */
    /* ========================================= */
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        // La clave es SOLO alternar la clase 'active'. 
        // El CSS debe hacer el trabajo de mostrar/ocultar el menú.
        nav.classList.toggle('active');

        // Cambia el ícono de la hamburguesa a X (y viceversa)
        if (nav.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Icono de cerrar (X)
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Icono de hamburguesa
        }
    });

    // Ocultar el menú móvil al hacer clic en un enlace (para navegación interna)
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            // Solo si el menú está activo, lo cerramos
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Si la pantalla es grande y el menú está "activo" (por haber cambiado de móvil a escritorio), 
    // asegura que la clase 'active' se elimine para que los estilos de escritorio dominen.
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
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
