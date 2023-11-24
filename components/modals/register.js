
import { register } from '../../services/usuarioService.js';

export class Register extends HTMLElement {
  
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.#render();

    }

    #render() {
        
        this.shadowRoot.innerHTML = `
            <div id="modal-register" class="modal">
                <div class="modal-content">
                    <span class="close" id="close-modal">&times;</span>
                    <h2>Registrate</h2>
                    <h3>Es rápido y fácil.<h3>
                    <div class="line"></div> 
                    <form action="" id="form-register">
                        <div>
                            <input name="newUsertag" type="text" id="new-usertag" placeholder="Usertag">
                        </div>
                        <div>
                            <input name="newUsername" type="text" id="new-username" placeholder="Nombre">
                        </div>
                        <div>
                            <input name="newPassword" type="password" id="new-password" placeholder="Contraseña nueva">
                        </div>
                        <div>
                        <label for="gender">Sexo:</label>
                        <select name="gender" id="gender" name="gender">
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            
                        </select>
                    </div>
                <div>
                    <label for="birthdate">Fecha de Nacimiento:</label>
                    <input name="birthdate" type="date" id="birthdate" placeholder="Selecciona la fecha de nacimiento">
                </div>
                        <button id="submit-register">Registrarse</button>
                    </form>
                </div>
            </div>

            <button id="register" class="new-account"> Crear cuenta nueva</button>

        `;
        this.#agregaEstilo();
        this.#toggleModal();
        this.#addEventListeners();
           
    }

    #agregaEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../css/register.css");
        this.shadowRoot.appendChild(link);
    }


    #addEventListeners() {
        const closeModalButton = this.shadowRoot.getElementById('close-modal');
        closeModalButton.addEventListener('click', this.#closeRegisterModal.bind(this));

        const formRegister = this.shadowRoot.getElementById('form-register');
        
        formRegister.addEventListener('submit', this.#handleRegister.bind(this)); 
        console.log(this.shadowRoot.innerHTML)
    }

    #closeRegisterModal() {
        const modal = this.shadowRoot.querySelector("#modal-register");
        modal.classList.remove("modal-open");
    }

    async #handleRegister(event) {
        event.preventDefault();
        console.log("hola register");
        const formData = new FormData(event.target);
        const usertag = formData.get('newUsertag');
        const username = formData.get('newUsername');
        const password = formData.get('newPassword');
        const gender = formData.get('gender');
        const birthdate = formData.get('birthdate');
        console.log(usertag);
        console.log(username);
        console.log(password);
        console.log(gender);
        console.log(birthdate);

        try {
            const data = await register(usertag, username, password, gender, birthdate);
            console.log(data);
            if (data) {
              alert('Registro exitoso');
              this.#closeRegisterModal(); 
            } 
          } catch (error) {
            console.error(error);
          }
    }

    #toggleModal() {
        
        
        const modal = this.shadowRoot.querySelector("#modal-register");
        const button = this.shadowRoot.querySelector(".new-account");
        button.addEventListener("click", () => modal.classList.add("modal-open"))
        
    }
}

customElements.define('register-comp', Register);
