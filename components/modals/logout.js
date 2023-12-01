
export class Logout extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
        this.attachShadow({mode: 'open'}); 
        this.#render();    
    }

    #render(){

        this.shadowRoot.innerHTML= `
        <div id="modal-log" class="modal">
           <div class="modal-content">
              <div class="header-modal-remove">
                  <h2> ¿Esta seguro que desea cerrar sesión? </h2>
                </div>
                <button id="logout-submit">Cerrar Sesión</button>
            </div>
        </div>
    `;
    this.#agregaEstilo();
    this.#addEventListeners();
  }

 #agregaEstilo(shadow) {
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', '../css/user.css');
    shadow.appendChild(link);
 }

 #addEventListeners(){
    const closeModalButton= this.shadowRoot.querySelector('#close-modal');

    if(closeModalButton){
        closeModalButton.addEventListener('click', this.#closeLogoutModal.bind(this));
    } else{
        console.error("Element with ID  'close-modal' not found.");
    }
 }

 #closeLogoutModal(){
    const modal= this.shadowRoot.querySelector("#modal-log");
    modal.classList.remove("modal-open");
}

} 
customElements.define('logout-comp', Logout);



