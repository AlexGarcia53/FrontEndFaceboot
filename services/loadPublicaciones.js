document.addEventListener("DOMContentLoaded", function() {
    recuperarUltimaPublicacion();
});

function recuperarUltimaPublicacion() {
    const contenedorPublicaciones= document.getElementById('contenedor-publicaciones');
    contenedorPublicaciones.insertAdjacentHTML('beforeend', `<user-publication></user-publication>`);
}