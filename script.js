document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');

    // Función para alternar la clase 'open' en el menú cuando se hace clic en el ícono de hamburguesa
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    // Cierra el menú automáticamente cuando se hace clic en un enlace
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
            }
        });
    });
});
