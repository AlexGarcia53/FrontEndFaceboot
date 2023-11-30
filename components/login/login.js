
import { login } from '../../services/usuarioService.js';
import '../modals/register.js'


class Login extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const register = document.createElement('register-comp');
    this.appendChild(register);
    this.#render(shadow);
    this.#agregaEstilo(shadow);
    this.#addEventListeners(shadow);

  }

  #render(shadow) {
    shadow.innerHTML = `
      <form actions="" id="form-login">
        <div>
         
          <input name= "username" type="text" id="username" placeholder="Username">
        </div>
        <div>
          
          <input name= "password" type="password" id="password" placeholder="Contraseña">
        </div>
        <button id="login">Iniciar sesión</button>
        <div class="line"></div> 
        <register-comp></register-comp>
      </form>

      `;
  }

  #agregaEstilo(shadow) {
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "../css/login.css");
    shadow.appendChild(link);
  }



  #addEventListeners(shadow) {
    const formLogin = shadow.getElementById('form-login');
    formLogin.addEventListener('submit', this.#handleLogin.bind(this)); // Añade .bind(this) para asegurarte de que 'this' se refiera a la instancia de la clase

  }

  async #handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const token = await login(username, password);
      console.log(token);
      if (token) {
        sessionStorage.setItem('jwtToken', token);
        alert('Inicio de sesión exitoso');

        window.location.href = 'home.html';
      } else {
        alert('Las credenciales son incorrectas');
      }
    } catch (error) {
      console.error(error);
    }
  }

}

customElements.define('login-comp', Login);