import '../modals/removePublication.js';
import '../modals/editPublication.js';

class PublicationHeader extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' });
  
      const usertag = this.getAttribute('usertag');
      const fechaCreacion = this.getAttribute('fechaCreacion');
      const publicacionId = this.getAttribute('_id');
      const texto = this.getAttribute('texto');
      const img = this.getAttribute('img');
      const creador = this.getAttribute('creador') === 'true';
      this.#render(shadow, usertag, fechaCreacion, creador, publicacionId, texto, img);
      this.#agregaEstilo(shadow);
      this.#addEventListeners(shadow)


    }
    
    #render(shadow, usertag, fechaCreacion, creador, publicacionId, texto, img) {
      if (creador === true) {
        shadow.innerHTML = `
                <div class="perfil-usuario">
                    <img src="../imgs/user.png" id="user">
                    <div>
                        <p id="usertag">${usertag}</p>
                        <small id="username">${fechaCreacion}</small>
                    </div>
                    <div class="options_dropdown">
                    <img src="../imgs/option.png" id="options">
                    <div class="options_dropdown_content">
                        <a href="#" id="editar">Editar</a>
                        <a href="#" id="eliminar">Eliminar</a>
                    </div>
                </div>
                </div>
          <removepublication-comp _id="${publicacionId}"></removepublication-comp>
          <editpublication-comp _id="${publicacionId}" texto="${texto}" img="${img}"></editpublication-comp>
        `;
      } else {
        shadow.innerHTML = `
          <div class="perfil-usuario">
            <img src="../imgs/user.png" id="user">
            <div>
              <p id="usertag">${usertag}</p>
              <small id="username">${fechaCreacion}</small>
            </div>
          </div>
        `;
      }
    }
  
    #agregaEstilo(shadow) {
      let link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', '../css/publicationHeader.css');
      shadow.appendChild(link);
    }

    #addEventListeners(shadow) {
        const eliminarButton = shadow.querySelector("#eliminar");   
        eliminarButton.addEventListener("click", () => this.#openRemoveModal(shadow));

        const editarButton = shadow.querySelector("#editar");
        editarButton.addEventListener("click", () => this.#openEditModal(shadow));
    }

    #openRemoveModal(shadow) {
        const removeComp = shadow.querySelector('removepublication-comp');

  
        if (removeComp) {
            const modal = removeComp.shadowRoot.querySelector("#modal-container");
      
            if (modal) {
                modal.style.display = 'block';
            }
        }
    }

    #openEditModal(shadow) {
        const removeComp = shadow.querySelector('editpublication-comp');

        if (removeComp) {
            const modal = removeComp.shadowRoot.querySelector("#modal-publicacion");
            if (modal) {
                modal.classList.add("modal-open");
            }
        }
    }

  }
  
  customElements.define('publication-header', PublicationHeader);