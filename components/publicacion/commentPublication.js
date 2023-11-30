import '../modals/addComment.js'

class CommentPublication extends HTMLElement {
    
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({ mode: 'open' });

        
        const publicacionId = this.getAttribute('_id');
        this.#render(shadow, publicacionId);
        this.#agregaEstilo(shadow, publicacionId);
        this.#addEventListeners(shadow);
    }

    #render(shadow, publicacionId){
        shadow.innerHTML = `
            <div class="comentar-contenedor">
                <img src="../imgs/user.png" id="user">
                <div id="comentar" class="agregar-comentario">
                    <p>Escribe un comentario...</p>
                </div>
            </div>
            <addcomment-comp _id="${publicacionId}"></addcomment-comp>
        `; 
    }

    #agregaEstilo(shadow){
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../css/publicationHeader.css');
        shadow.appendChild(link);
    }

    #addEventListeners(shadow) {
        const butonComentar = shadow.querySelector("#comentar");
    
        butonComentar.addEventListener("click", () => this.#openPublicationModal(shadow));
      }
    
    #openPublicationModal(shadow) {
        const addPubComp = shadow.querySelector('addcomment-comp');
        
        if (addPubComp) {
          const modal = addPubComp.shadowRoot.querySelector("#modal-publicacion");
          if (modal) {
            
            modal.classList.add("modal-open");
          }
        }
      }
    
}

customElements.define('comment-publication', CommentPublication);