import { obtenerUsuarioDesdeToken } from "../../services/usuarioService.js";
import { editComment } from "../../services/comentarioService.js";

class EditComment extends HTMLElement {
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
                        <div class="header-modal-publicar">
                            <p>Edita tu comentario</p>
                            <svg id="close-modal" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
                                width="44" height="44" viewBox="0 0 24 24" stroke-width="" stroke="#ff2825" fill="none"
                                stroke-linecap="round" stroke-linejoin="round" style="margin-right: 10px;">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                <path d="M10 10l4 4m0 -4l-4 4" />
                            </svg>
                        </div>
                        <form action="" id="my-form-add">
                        <div class="body-modal-publicar">
                            <textarea id="textAreaPublicar" class="textAreaPublicar" placeholder="Estas editando tu comentario...">
                            </textarea>
                        </div>

                        <div class="footer-modal-publicar">
                            
                            
                                
                                <label for="imageInput" class="custom-file-input" margin-bottom: -15px;">
                                <p>Añadir a tu publicación</p>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-photo-plus"
                                    width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#00b341" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round" style=margin-top: -35px;">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="    none" />
                                    <path d="M15 8h.01" />
                                    <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
                                    <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4" />
                                    <path d="M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54" />
                                    <path d="M16 19h6" />
                                    <path d="M19 16v6" />
                                </svg>
                                </label>
                                <input type="file" accept="image/*" id="imageInput" style="display:none" />
                          
                            <button id="btn-publicar">Publicar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;   
      
        const imageInput = this.shadowRoot.querySelector('#imageInput');

        imageInput.addEventListener('change', this.#handleImageUpload.bind(this));
        this.#addEventListeners();
    }

    #agregaEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../css/publicationModal.css");
        this.shadowRoot.appendChild(link);
    }

    #addEventListeners() {
        const closeModalButton = this.shadowRoot.querySelector('#close-modal');
        const formUpdate = this.shadowRoot.querySelector('#my-form-add');

        if (closeModalButton) {
            closeModalButton.addEventListener('click', this.#closeAddModal.bind(this));
        } else {
            console.error("Element with ID  'close-modal' not found.");
        }

        if (formUpdate) {
            formUpdate.addEventListener('submit', this.#handleAddPublication.bind(this));
        } else {
            console.error("Element with ID 'form-update' not found.");
        }
    }

    #closeAddModal() {
        const modal = this.shadowRoot.querySelector("#modal-publicacion");
        modal.classList.remove("modal-open");
    }

    #handleImageUpload(event) {
        const fileInput = event.target;
        const file = fileInput.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            console.log('Image URL:', imageUrl);
        } else {
            console.log('No file selected');
        }
    }

    async #handleAddPublication(event) {
        event.preventDefault();

        const token = localStorage.getItem('jwtToken');
        const usuario = obtenerUsuarioDesdeToken(token);
        const usertag = usuario.userId;

        const textarea = this.shadowRoot.querySelector('#textAreaPublicar');
        const texto = textarea.value.trim();

        const imageInput = this.shadowRoot.querySelector('#imageInput');
        const img = this.#getImageUrl(imageInput);

        try {
            const data = await editComment(usertag, texto, img);
            console.log(data);
            if (data) {
                textarea.value = '';
                if (imageInput) {
                    imageInput.value = '';
                }
                alert('Se editó tu publicación');
                this.#closeAddModal();
            }
        } catch (error) {
            console.error(error);
        }
    }

    #getImageUrl(inputElement) {
        const file = inputElement ? inputElement.files[0] : null;
        return file ? URL.createObjectURL(file) : '';
    }

}


customElements.define('editcomment-comp', EditComment);