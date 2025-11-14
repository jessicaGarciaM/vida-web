document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');

    // Función para alternar la clase 'open' en el menú cuando se hace clic en el ícono de hamburguesa
    menuToggle.addEventListener('click', () => {
        // La clase 'open' es la que muestra el menú en el CSS
        nav.classList.toggle('open');
    });

    // Cierra el menú automáticamente cuando se hace clic en un enlace (Mejora la UX en móvil)
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
            }
        });
    });

    // NOTA: Para una página con alto contenido dinámico (como eventos o formularios),
    // se añadiría más código JS aquí.
});