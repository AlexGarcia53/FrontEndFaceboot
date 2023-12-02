
import { obtenerUsuarioDesdeToken, obtenerUsuario } from '../../services/usuarioService.js';
import '../modals/addPublication.js'

class Publicar extends HTMLElement {

  constructor() {
    super();
  
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    this.#render(shadow);
    this.#consultaUsuario();
    this.#agregaEstilo(shadow);
    const updateComp = document.createElement('addpublication-comp');
    shadow.appendChild(updateComp);
    this.#addEventListeners(shadow)
  }

  #render(shadow) {
    shadow.innerHTML = `
    <div class="publicar-contenedor">
    <div class="perfil-usuario">
    <img src="../imgs/user.png" id="user">
    <div>
        <p id="usertag">ea</p>
        <small id="username">aquí andamos</small>
    </div>

    </div>

<div class="publicar-input-contenedor">
    <div id="publicar" class="publicar-input">
        <span id= "text-publicar" >¿Qué estás pensando, Yocupicio?</span>
    </div>
</div>

</div>`
      ;
  }

  #agregaEstilo(shadow) {
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', '../css/publicar.css');
    shadow.appendChild(link);
  }

  async #consultaUsuario() {
    const token = sessionStorage.getItem('jwtToken');
    const usuario = obtenerUsuarioDesdeToken(token);
    const usertag = usuario.userId;

    const usuarioactualizado = await obtenerUsuario(usertag, token);
    const username = usuarioactualizado.username;

    const usertagElement = this.shadowRoot.getElementById('usertag');
    const usernameElement = this.shadowRoot.getElementById('username');
    const text = this.shadowRoot.getElementById('text-publicar');

    usertagElement.textContent = usertag;
    usernameElement.textContent = username;
    text.textContent = `¿Qué estás pensando, ${username}?`;

  }

  #addEventListeners(shadow) {
    const butonPublicar = shadow.querySelector("#publicar");

    butonPublicar.addEventListener("click", () => this.#openPublicationModal(shadow));
  }

  #openPublicationModal(shadow) {
    const addPubComp = shadow.querySelector('addpublication-comp');
    
    if (addPubComp) {
      const modal = addPubComp.shadowRoot.querySelector("#modal-publicacion");
      if (modal) {
        
        modal.classList.add("modal-open");
      }
    }
  }


}

window.customElements.define('publicar-comp', Publicar);