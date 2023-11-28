import '../modals/editComment.js';
import '../modals/removeComment.js';

class PublicationComment extends HTMLElement {
    
    constructor(usertag, texto, imagen){
        super();
        this.usertag= usertag;
        this.texto= texto;
        this.imagen= imagen;
    }

    connectedCallback(){
        const shadow = this.attachShadow({ mode: 'open' });

        const usertag= this.getAttribute('usertag');
        const texto= this.getAttribute('texto');
        const imagen= this.getAttribute('imagen');
        const creador= this.getAttribute('creador') === 'true';

        this.#render(shadow, usertag, texto, imagen, creador);
        this.#agregaEstilo(shadow);
        this.#addEventListeners(shadow)
    }

    #render(shadow, usertag, texto, imagen, creador){
        if((texto.trim()!=='') && 
        (imagen.trim()!=='')){
            if(creador===true){
                shadow.innerHTML = `
                    <div class="comentario">
                        <img src="../imgs/user.png" id="user">
                        <div class="contenido-comentario">
                            <p id="usuario-comentario">${usertag}</p>
                            <div class="texto-comentario">
                                <p>${texto}</p>
                            </div>
                            <div class="imagen-comentario">
                                <img src="../imgs/faceboot.jpg" id="contenido">
                            </div>
                        </div>
                        <div class="options_dropdown_comentario">
                            <img src="../imgs/more.png" id="options_comentario">
                            <div class="options_dropdown_content">
                            <a href="#" id="editar">Editar</a>
                            <a href="#" id="eliminar">Eliminar</a>
                            </div>
                        </div>
                    </div>
                    <editcomment-comp></editcomentario-comp>
                    <removecomment-comp></removecomment-comp>
                `;
            }else{
                shadow.innerHTML = `
                    <div class="comentario">
                        <img src="../imgs/user.png" id="user">
                        <div class="contenido-comentario">
                            <p id="usuario-comentario">${usertag}</p>
                            <div class="texto-comentario">
                                <p>${texto}</p>
                            </div>
                            <div class="imagen-comentario">
                                <img src="../imgs/faceboot.jpg" id="contenido">
                            </div>
                        </div>
                    </div>
                `;
            }
        }else if((texto.trim()!=='') &&
        (imagen.trim()==='')){
            if(creador===true){
                shadow.innerHTML= `
                    <div class="comentario">
                        <img src="../imgs/user.png" id="user">
                        <div class="contenido-comentario">
                            <p id="usuario-comentario">${usertag}</p>
                            <div class="texto-comentario">
                                <p>${texto}</p>
                            </div>
                        </div>
                        <div class="options_dropdown_comentario">
                            <img src="../imgs/more.png" id="options_comentario">
                            <div class="options_dropdown_content">
                            <a href="#" id="editar">Editar</a>
                            <a href="#" id="eliminar">Eliminar</a>
                            </div>
                        </div>
                    </div>
                    <editcomment-comp></editcomentario-comp>
                    <removecomment-comp></removecomment-comp>
                `;
            }else{
                shadow.innerHTML= `
                    <div class="comentario">
                        <img src="../imgs/user.png" id="user">
                        <div class="contenido-comentario">
                            <p id="usuario-comentario">${usertag}</p>
                            <div class="texto-comentario">
                                <p>${texto}</p>
                            </div>
                        </div>
                 </div>
                `;
            }
        }else if((texto.trim()==='') &&
        (imagen.trim()!=='')){
            if(creador===true){
                shadow.innerHTML= `
                    <div class="comentario">
                        <img src="../imgs/user.png" id="user">
                        <div class="contenido-comentario">
                            <p id="usuario-comentario">${usertag}</p>
                            <div class="imagen-comentario">
                                <img src="../imgs/faceboot.jpg" id="contenido">
                            </div>
                        </div>
                        <div class="options_dropdown_comentario">
                            <img src="../imgs/more.png" id="options_comentario">
                            <div class="options_dropdown_content">
                            <a href="#" id="editar">Editar</a>
                            <a href="#" id="eliminar">Eliminar</a>
                            </div>
                        </div>
                    </div>
                    <editcomment-comp></editcomment-comp>
                    <removecomment-comp></removecomment-comp>
                `;
            }else{
                shadow.innerHTML= `
                    <div class="comentario">
                        <img src="../imgs/user.png" id="user">
                        <div class="contenido-comentario">
                            <p id="usuario-comentario">${usertag}</p>
                            <div class="imagen-comentario">
                                <img src="../imgs/faceboot.jpg" id="contenido">
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }

    #agregaEstilo(shadow){
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../css/publicationHeader.css');
        shadow.appendChild(link);
    }

    #addEventListeners(shadow) {
 
        const editarButton = shadow.querySelector("#editar");
        editarButton.addEventListener("click", () => this.#openEditModal(shadow));
        const eliminarButton = shadow.querySelector("#eliminar");
        eliminarButton.addEventListener("click", () => this.#openRemoveModal(shadow));

    }

    #openRemoveModal(shadow) {
        const removeComp = shadow.querySelector('removecomment-comp');
        console.log(removeComp)
        if (removeComp) {
            const modal = removeComp.shadowRoot.querySelector("#modal-container");
            console.log(modal);
            if (modal) {
                modal.style.display = 'block';
            }
        }
    }

    #openEditModal(shadow) {
        const editComp  = shadow.querySelector('editcomment-comp');

        if (editComp ) {
            const modal = editComp.shadowRoot.querySelector("#modal-publicacion");
            if (modal) {
                modal.classList.add("modal-open");
            }
        }
    }
}

customElements.define('publication-comment', PublicationComment);