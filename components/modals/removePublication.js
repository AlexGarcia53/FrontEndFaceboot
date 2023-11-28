import {deletePublication} from '../../services/publicacionService.js' 

class RemovePublication extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        const publicacionId = this.getAttribute('_id');
        this.#render();
        this.#agregaEstilo();
        this.#addEventListeners(publicacionId);
    
    }

    #render() {
        this.shadowRoot.innerHTML = `
            <div id="modal-container" class="modal">
                <div class="modal-content">
                    <div class="header-modal-remove">
                        <span>¿Estás seguro de eliminar esta publicación?</span>
                    </div>                                     
                    <button id="btn-cancelar">Cancelar</button>
                    <button id="btn-confirmar">Confirmar eliminación</button>
                </div>
            </div>
        `;
    }
    #agregaEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../css/removeElement.css");
        this.shadowRoot.appendChild(link);
    }

    #addEventListeners(publicacionId) {
        const btnCancel = this.shadowRoot.getElementById('btn-cancelar');
        const btnConfirmar = this.shadowRoot.getElementById('btn-confirmar');

        btnCancel.addEventListener('click', () => {
            this.#closeRemoveModal();
        });

        btnConfirmar.addEventListener('click', () => {
            
            this.#eliminarPublicacion(publicacionId);
        });

    }

    async #eliminarPublicacion(id) {
        try {
            const data = await deletePublication(id);
    
            if (data === undefined) {
                alert('Eliminado exitoso');
                this.#closeRemoveModal();
            } 
        } catch (error) {
            console.error('Error al eliminar:', error.message);
        }
    }

    #closeRemoveModal() {
        const modal = this.shadowRoot.getElementById('modal-container');
        modal.style.display = 'none';
    }

}


customElements.define('removepublication-comp', RemovePublication);