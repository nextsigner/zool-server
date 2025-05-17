function cargarEstilosSegunOrientacion() {
    // Verificar si la orientación actual es landscape
    const esLandscape = window.matchMedia("(orientation: landscape)").matches;

    // Obtener la referencia al elemento head
    const head = document.querySelector('head');

    // Crear un elemento link para cargar los estilos
    const link = document.createElement('link');
    link.rel = 'stylesheet';

    if (esLandscape) {
        // Si es landscape, cargar el archivo style.css
        link.href = 'style.css';
        //alert('AAA')
    } else {
        // Si es portrait, cargar el archivo style-portrait.css
        link.href = 'style-portrait.css';
        //alert('BBB')
    }

    // Agregar el elemento link al head
    head.appendChild(link);
}
// Llamar a la función cuando se cargue la página
window.addEventListener('load', cargarEstilosSegunOrientacion);
