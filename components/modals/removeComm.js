import {deleteComment} from '../../services/comentarioService.js' 

class RemoveComment extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.#render();
        this.#agregaEstilo();

    }

    #render() {
        this.shadowRoot.innerHTML = `
            <div id="modal-publicacion" class="modal">
                <div class="modal-content">
                    <div id="modal-publicar">
                        
                            
                            
                        <div class="header-modal-remove">
                        <span>¿Estás seguro de eliminar este comentario?</span>
                        </div>  

                                <input type="file" accept="image/*" id="imageInput" style="display:none" />
                                <button id="btn-cancelar">Cancelar</button>
                                <button id="btn-confirmar">Confirmar eliminación</button>       
                    </div>
                </div>
            </div>
        `;   
        const publicacionId = this.getAttribute('publicacion-id');
        const comentarioId = this.getAttribute('comentario-id');
        this.#addEventListeners(publicacionId, comentarioId);
       
    }

    #agregaEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../css/removeElement.css");
        this.shadowRoot.appendChild(link);
    }

    #addEventListeners(publicacionId, comentarioId) {
        const btnCancel = this.shadowRoot.getElementById('btn-cancelar');
        const btnConfirmar = this.shadowRoot.getElementById('btn-confirmar');
    
        btnCancel.removeEventListener('click', this.#closeRemoveModal.bind(this));
        btnConfirmar.removeEventListener('click', () => this.#eliminarComentario(publicacionId, comentarioId));
    
        btnCancel.addEventListener('click', () => {
            this.#closeRemoveModal();
        });
    
        btnConfirmar.addEventListener('click', () => {
            this.#eliminarComentario(publicacionId, comentarioId);
        });
    }

    async #eliminarComentario(publicacionId, comentarioId) {
        try {
            const data = await deleteComment(publicacionId, comentarioId);
            
            
            if (data === undefined) {
                console.log("gyat");
                window.dispatchEvent(new CustomEvent('comentarioEliminado', { detail: comentarioId }));
                this.#closeRemoveModal();
            } 
        } catch (error) {
            console.error('Error al eliminar:', error.message);
        }
    }

    #closeRemoveModal() {
        const modal = this.shadowRoot.querySelector("#modal-publicacion");
        modal.classList.remove("modal-open");
    }


}


customElements.define('removecomm-comp', RemoveComment);