
import { obtenerUsuarioDesdeToken } from '../../services/usuarioService.js';
class Publicar extends HTMLElement {

  constructor() {
    super();
    this.userId = ''; // Almacena el userId
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    this.#render(shadow);
    this.#consultaUsuario();
    this.#agregaEstilo(shadow);
  }

  #render(shadow) {
    shadow.innerHTML = `
      <div class="perfil-usuario">
      <img src="images/fotodiscord.PNG">
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

</div>
      `;
  }

  #agregaEstilo(shadow) {
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute("href", "../css/publicar.css");
    shadow.appendChild(link);
  }

  #consultaUsuario() {
    const token = localStorage.getItem('jwtToken');
    const usuario = obtenerUsuarioDesdeToken(token);
    const usertag = usuario.userId;
    const username = usuario.username;

    const usertagElement = this.shadowRoot.getElementById('usertag');
    const usernameElement = this.shadowRoot.getElementById('username');
    const text = this.shadowRoot.getElementById('text-publicar');

    usertagElement.textContent = usertag;
    usernameElement.textContent = username;
    text.textContent = `¿Qué estás pensando, ${username}?`;

  }


}

window.customElements.define('publicar-comp', Publicar);