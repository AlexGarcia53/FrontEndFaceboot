

class Login extends HTMLElement {
    
    #usernameInput;
    #passwordInput;
    #loginButton;
  
    constructor() {
      super();
    }
  
    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' });
      this.#render(shadow);
      this.#agregaEstilo(shadow);	
      this.#initializeElements(shadow);
      this.#addEventListeners();
    }
  
    #render(shadow) {
      shadow.innerHTML = `
      <form actions="">
        <div>
         
          <input type="text" id="username" placeholder="Username">
        </div>
        <div>
          
          <input type="password" id="password" placeholder="Contraseña">
        </div>
        <button id="login">Iniciar sesión</button>
        <div class="line"></div> <br>
        <button class="new-account"> Crear cuenta nueva</button>
      </form>
    

      `;
    }

    #agregaEstilo(shadow){		
		let link = document.createElement("link");
		link.setAttribute("rel","stylesheet");
		link.setAttribute("href","../css/login.css");		
		shadow.appendChild(link);
	}
  
    #initializeElements(shadow) {
      this.#usernameInput = shadow.getElementById('username');
      this.#passwordInput = shadow.getElementById('password');
      this.#loginButton = shadow.getElementById('login');
    }
  
    #addEventListeners() {
      this.#loginButton.addEventListener('click', () => this.#handleLogin());
    }
  
    async #handleLogin() {
      
      const username = this.#usernameInput.value;
      const password = this.#passwordInput.value;
  
      try {
        const data = await usuarioService.login(username, password);
        console.log(data);
        if (data.success) {
          alert('Inicio de sesión exitoso');
        
        } else {
          alert('Las credenciales son incorrectas');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  customElements.define('login-comp', Login);