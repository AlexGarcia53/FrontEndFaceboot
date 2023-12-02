import { recuperarPublicaciones } from '../../services/loadPublicaciones.js';

document.addEventListener("DOMContentLoaded", function() {
    const botonCargarMas= document.getElementById('cargar-mas');

    botonCargarMas.addEventListener("click", function() {
        console.log("Entro");
        recuperarPublicaciones();
    });
});