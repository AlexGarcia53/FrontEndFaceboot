import { obtenerPublicacionesContenido } from '../../services/publicacionService.js';
import { reiniciarIndice } from '../../services/loadPublicaciones.js';
import { recuperarPublicaciones } from '../../services/loadPublicaciones.js';
import '../modals/update.js';

document.addEventListener("DOMContentLoaded", function () {
    class Header extends HTMLElement {

        constructor() {
            super();
        }

        connectedCallback() {
            const shadow = this.attachShadow({ mode: 'open' });


            //this.#recuperarPublicacion(shadow);
            this.#render(shadow);
            this.#agregaEstilo(shadow);
            this.#addEventListeners(shadow);
            const updateComp = document.createElement('update-comp');
            shadow.appendChild(updateComp);
        }

        #render(shadow) {
            shadow.innerHTML = `
          <nav>
          <div class="nav-left">
              <img src="/imgs/logo-letras-blancas.png" class="logo">
              <div class="barra-busqueda">
                  <svg id="add-publication" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="22"
                      height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                      <path d="M21 21l-6 -6" />
                  </svg>
                  <input type="text" placeholder="Buscar en faceboot..." id="buscarPublicacion">
              </div>
          </div>
          <div class="nav-right">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-plus" width="50" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="#0c3770" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                  <path d="M15 12h-6" />
                  <path d="M12 9v6" />
              </svg>
  
              <img src="/imgs/fotodiscord.PNG" class="icono-usuario", id="icono">
              
              
          </div>
          
      </nav>`
          ;
      }

    #agregaEstilo(shadow) {
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../css/header.css');
        shadow.appendChild(link);
    }

    #addEventListeners(shadow) {
        const iconoUsuario = shadow.querySelector("#icono");
        const inputBusqueda= shadow.querySelector('#buscarPublicacion');

        iconoUsuario.addEventListener("click", () => this.#openProfileModal(shadow));
        inputBusqueda.addEventListener("keydown", async function(event) {
            if(event.key==="Enter"){
                const contenedorPublicaciones= document.getElementById('contenedor-publicaciones');
                const botonCargarMas= document.getElementById('cargar-mas');
                if(inputBusqueda.value!==''){
                    try{
                        var publicaciones= await obtenerPublicacionesContenido(inputBusqueda.value);
                        if(publicaciones){
                            contenedorPublicaciones.innerHTML= '';
                            botonCargarMas.style.display= 'none';
                            //botonCargarMas.remove();
                            publicaciones.forEach(publicacion =>{
                                var publicacionString= JSON.stringify(publicacion);
                                contenedorPublicaciones.insertAdjacentHTML('beforeend', `<user-publication publication='${publicacionString}'></user-publication>`);
                            });
                        }else{
                            console.log("No hay publicaciones");
                        }
                    }catch(error){
                        throw error;
                    }
                }else{
                    contenedorPublicaciones.innerHTML= '';
                    botonCargarMas.style.display= 'flex';
                    reiniciarIndice();
                    recuperarPublicaciones();
                }
            }
        })
    }

    #openProfileModal(shadow) {
        const updateComp = shadow.querySelector('update-comp');

        if (updateComp) {
            const modal = updateComp.shadowRoot.querySelector("#modal-user");
            if (modal) {
                modal.classList.add("modal-open");
            }
        }
    }
}
customElements.define('header-comp', Header);
});
