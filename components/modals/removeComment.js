
class RemoveComment extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.#render();
        this.#agregaEstilo();
        this.#addEventListeners();

    }

    #render() {
        this.shadowRoot.innerHTML = `
            <div id="modal-container" class="modal">
                <div class="modal-content">
                    <div class="header-modal-remove">
                        <span>¿Estás seguro de eliminar este comentario?</span>
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

    #addEventListeners() {
        const btnCancel = this.shadowRoot.getElementById('btn-cancelar');
        const btnConfirmar = this.shadowRoot.getElementById('btn-confirmar');

        btnCancel.addEventListener('click', () => {
            this.#closeRemoveModal();
        });

        btnConfirmar.addEventListener('click', (event) => {
            this.#closeRemoveModal(event);
        });

    }

    #closeRemoveModal() {
        const modal = this.shadowRoot.getElementById('modal-container');
        modal.style.display = 'none';
    }

}


customElements.define('removecomment-comp', RemoveComment);