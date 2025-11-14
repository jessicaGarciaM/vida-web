document.addEventListener('DOMContentLoaded', function () {
    /* ========================================= */
    /* 1. FUNCIONALIDAD DEL CARRUSEL (HERO) */
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
        // AÑADE o REMUEVE la clase 'active'. ¡Esto es lo único que hace el JS!
        nav.classList.toggle('active');

        // Cambia el ícono (hamburguesa <-> X)
        if (nav.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Cierra el menú móvil al hacer clic en un enlace (para facilitar la navegación)
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
});


/* ========================================= */
/* 3. FUNCIONALIDAD DE MODALES */
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
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

