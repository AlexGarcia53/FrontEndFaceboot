import { obtenerUsuarioDesdeToken } from "../../services/usuarioService.js";
import { editPublication } from "../../services/publicacionService.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import { app } from "../../services/firebaseConfig.js";

class EditPublication extends HTMLElement {
    constructor() {
        super();
        this.img = null;
        this.texto = '';
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        
        this.texto = this.getAttribute('texto');
        console.log("texto en callback:"+ this.texto)
        this.img = this.getAttribute('img');
        console.log(this.texto);
        this.#render(this.texto);
        this.#agregaEstilo();
    }

    #render() {
        this.shadowRoot.innerHTML = `
            <div id="modal-publicacion" class="modal">
                <div class="modal-content">
                    <div id="modal-publicar">
                        <div class="header-modal-publicar">
                            <p>Edita tu publicación</p>
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
                            <textarea id="textAreaPublicar" class="textAreaPublicar" placeholder="Estas editando tu publicación...">
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
                          
                            <button id="btn-publicar">Editar publicación</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const imageInput = this.shadowRoot.querySelector('#imageInput');
        const textoArchivo = this.shadowRoot.querySelector('#textoArchivo');

        imageInput.addEventListener('change', function () {
            if (imageInput.files.length > 0) {
                textoArchivo.innerText = 'Archivo seleccionado';
            } else {
                textoArchivo.innerText = 'Seleccionar archivo';
            }
        });
        const textarea = this.shadowRoot.querySelector('#textAreaPublicar');
        textarea.value = this.texto;

        const publicacionId = this.getAttribute('_id');
        this.#addEventListeners(publicacionId);
    }

    #agregaEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../css/publicationModal.css");
        this.shadowRoot.appendChild(link);
    }

    #addEventListeners(publicacionId) {
        const closeModalButton = this.shadowRoot.querySelector('#close-modal');
        const formUpdate = this.shadowRoot.querySelector('#my-form-add');
        console.log("aqui ando:" + publicacionId)

        closeModalButton.addEventListener('click', this.#closeAddModal.bind(this));
        formUpdate.addEventListener('submit', (event) => this.#handleEditPublication(event, publicacionId));

    }

    #closeAddModal() {
        const modal = this.shadowRoot.querySelector("#modal-publicacion");
        modal.classList.remove("modal-open");
    }

    async #handleEditPublication(event, publicacionId) {
        event.preventDefault();

        const token = sessionStorage.getItem('jwtToken');
        const usuario = obtenerUsuarioDesdeToken(token);
        const usertag = usuario.userId;

        const textarea = this.shadowRoot.querySelector('#textAreaPublicar');
        this.texto = textarea.value.trim();

        const imageInput = this.shadowRoot.querySelector('#imageInput');
        const fechaCreacion = this.#getDateFormat();
        let img = this.img;
        if (imageInput.files[0]) {
            img = await this.#uploadToFirebase(usertag, fechaCreacion, imageInput.files[0]);
        }

        try {
            const data = await editPublication(usertag, this.texto, img, fechaCreacion, publicacionId);
            console.log(data);
            if (data) {

                alert('Se editó tu publicación');
                this.#closeAddModal();
            }
        } catch (error) {
            console.error(error);
        }
    }

    #getDateFormat() {
        const fechaActual = new Date();
        const anio = fechaActual.getFullYear();
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const dia = fechaActual.getDate().toString().padStart(2, '0');
        const horas = fechaActual.getHours().toString().padStart(2, '0');
        const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
        const segundos = fechaActual.getSeconds().toString().padStart(2, '0');

        const fechaCreacion = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

        return fechaCreacion;
    }

    #uploadToFirebase(usertag, fechaCreacion, file) {
        return new Promise((resolve, reject) => {
            const imageUrl = URL.createObjectURL(file);
            console.log('Image URL:', imageUrl);
            const storage = getStorage(app);

            const storageRef = ref(storage, 'imgs/' + usertag + " - " + fechaCreacion);
            console.log(storageRef);
            const uploadTask = uploadBytes(storageRef, file);

            uploadTask.then((snapshot) => {
                console.log('Imagen subida exitosamente:', snapshot);
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log('URL de descarga:', downloadURL);
                    resolve(downloadURL);
                });
            }).catch((error) => {
                console.error('Error al subir la imagen:', error);
                reject(error);
            });
        });
    }
}


customElements.define('editpublication-comp', EditPublication);