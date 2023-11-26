import { update } from '../../services/usuarioService.js';
import { obtenerUsuarioDesdeToken } from '../../services/usuarioService.js';

export class Update extends HTMLElement{
    
    constructor(){
        super();
    }

    connectedCallback(){
        this.attachShadow({mode: 'open'}); 
        this.#render();
        
    }

    #render(){

        this.shadowRoot.innerHTML= `
        <div id="modal-user" class="modal">
        <div class="modal-content">
            <span class="close" id="close-modal">&times;</span>
            <h2> Edita tu Perfil </h2>
            <div class="line"></div>
            <form action="" id="my-form-update">
                <div>
                    <input name="uptUsername" type="text" id="upt-username" maxlength="25" placeholder="Username">
                </div>
                <div>
                    <input name="uptPassword" type="password" id="upt-password" maxlength="20" placeholder="Contraseña">
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
                    <input name="birthdate" type="date" id="birthdate" placeholder="Seleccione su fecha de nacimiento">
                </div>
                    <button id="update-submit">Actualizar Perfil</button>
            </form>
        </div>
    </div>
    <button id="update" class="update-account"> Editar Perfil </button>`;
    this.#agregarEstilo();
    this.#toggleModal();
    this.#consultaUsuario();
    this.#addEventListeners();
    }

    #agregarEstilo(){
        let link= document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../css/user.css");
        this.shadowRoot.appendChild(link);
    }

    #addEventListeners(){
        const closeModalButton= this.shadowRoot.querySelector('#close-modal');
        const formUpdate= this.shadowRoot.querySelector('#my-form-update');

        if(closeModalButton){
            closeModalButton.addEventListener('click', this.#closeUpdateModal.bind(this));
        } else{
            console.error("Element with ID  'close-modal' not found.");
        }

        if(formUpdate){
            formUpdate.addEventListener('submit', this.#handleUpdate.bind(this));
        } else{
            console.error("Element with ID 'form-update' not found.");
        }
    }

    #closeUpdateModal(){
        const modal= this.shadowRoot.querySelector("#modal-user");
        modal.classList.remove("modal-open");
    }

    async #handleUpdate(event){
        event.preventDefault();

        const formData= new FormData(event.target);
        const username= formData.get('uptUsername');
        const password= formData.get('uptPassword');
        const gender= formData.get('gender');
        const birthdate= formData.get('birthdate'); 


        try{
            const data= await update(username, password, gender, birthdate);
            console.log(data);
            if(data){
                alert('Usuario Actualizado');
                this.#closeUpdateModal();
            }
        } catch(error){
            console.error(error);
        }
    }

    #toggleModal(){

        const modal= this.shadowRoot.querySelector("#modal-user");
        const button= this.shadowRoot.querySelector(".update-account");
        button.addEventListener("click", () => modal.classList.add("modal-open"));
    }

    #consultaUsuario() {
        const token= localStorage.getItem('jwtToken');
        const usuario= obtenerUsuarioDesdeToken(token);
     
        const usernameElement = this.shadowRoot.getElementById('upt-username');
        const passwordElement = this.shadowRoot.getElementById('upt-password');
        const genderElement = this.shadowRoot.getElementById('gender');
        const birthdateElement = this.shadowRoot.getElementById('birthdate');
   
    

        const fechaNacimientoDate = new Date(usuario.fechaNacimiento);
        const formattedDate = fechaNacimientoDate.toISOString().split('T')[0];
        
        console.log(usuario.fechaNacimiento);
        console.log('hola');
        console.log(formattedDate);

        usernameElement.value = usuario.username;
        passwordElement.value = usuario.contrasenia;
        genderElement.value = usuario.sexo;
        birthdateElement.value = formattedDate;

    }

}

customElements.define('update-comp', Update);