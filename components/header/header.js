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

            this.#render(shadow);
            this.#agregaEstilo(shadow);
            this.#addEventListeners(shadow);
            const updateComp = document.createElement('update-comp');
            const logoutComp= document.createElement('logout-comp');
            shadow.appendChild(logoutComp);
            shadow.appendChild(updateComp);
        }

        #render(shadow) {
            shadow.innerHTML = `
          <nav>
          <div class="nav-left">
              <img src="/imgs/logo-letras-blancas.png" class="logo">
              <div class="barra-busqueda">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="22"
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
            <div id="icono2-container" class="log-out">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" id="icono2" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M9 12h12l-3 -3" />
                    <path d="M18 15l3 -3" />
                </svg>
            </div>

            <img src="../imgs/user.png" class="icono-usuario", id="icono">
          </div>
      </nav>`;
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
        const logoutButtonContainer = shadow.querySelector('#icono2-container');

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
        });
        
        if (logoutButtonContainer) {
                logoutButtonContainer.addEventListener('click', () => {
                    console.log('Clic en el botón de logout');
                    const redirectTo = 'login.html';
                    window.location.href = redirectTo;
                });
            }
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