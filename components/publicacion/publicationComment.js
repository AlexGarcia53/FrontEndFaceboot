import '../modals/editComment.js';
import '../modals/removePublication.js'
import '../modals/removeComm.js'

class PublicationComment extends HTMLElement {
    
    constructor(usertag, texto, imagen, comentarioId){
        super();

        this.usertag= usertag;
        this.texto= texto;
        this.imagen= imagen;
        this.comentarioId = comentarioId;
    }

    connectedCallback(){
        const shadow = this.attachShadow({ mode: 'open' });

        const usertag= this.getAttribute('usertag');
        const texto= this.getAttribute('texto');
        const imagen= this.getAttribute('imagen');
        const creador= this.getAttribute('creador') === 'true';
        const idComentario = this.getAttribute('comentario-id');
        const idPublicacion = this.getAttribute('publicacion-id');

        this.#render(shadow, usertag, texto, imagen, creador, idComentario, idPublicacion);
        this.#escucharEliminacion(idComentario)
        
        this.#agregaEstilo(shadow);
        this.#addEventListeners(shadow)
        this.#escucharActualizacion(idComentario);
    }

    #render(shadow, usertag, texto, imagen, creador, idComentario, idPublicacion){
        if((texto.trim()!=='') && 
        (imagen.trim()!=='')){
            if(creador===true){
                shadow.innerHTML = `
                    <div class="comentario" id="${idComentario}">
                        <img src="../imgs/user.png" id="user">
                        <div class="contenido-comentario">
                            <p id="usuario-comentario">${usertag}</p>
                            <div class="texto-comentario">
                                <p>${texto}</p>
                            </div>
                            <div class="imagen-comentario">
                                <img src="${imagen}" id="contenido">
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
                    <removecomm-comp comentario-id="${idComentario}" publicacion-id="${idPublicacion}"></removecomm-comp>
                    <editcomment-comp comentario-id="${idComentario}" publicacion-id="${idPublicacion}" texto="${texto}" img="${imagen}"></editcomentario-comp>     
                         
                `;
            }else{
                shadow.innerHTML = `
                    <div class="comentario" id="${idComentario}">
                        <img src="../imgs/user.png" id="user">
                        <div class="contenido-comentario">
                            <p id="usuario-comentario">${usertag}</p>
                            <div class="texto-comentario">
                                <p>${texto}</p>
                            </div>
                            <div class="imagen-comentario">
                                <img src="${imagen}" id="contenido">
                            </div>
                        </div>
                    </div>
                `;
            }
        }else if((texto.trim()!=='') &&
        (imagen.trim()==='')){
            if(creador===true){
                shadow.innerHTML= `
                <div class="comentario" id="${idComentario}">
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
                    <removecomm-comp comentario-id="${idComentario}" publicacion-id="${idPublicacion}"></removecomm-comp>
                    <editcomment-comp comentario-id="${idComentario}" publicacion-id="${idPublicacion}" texto="${texto}" img="${imagen}"></editcomentario-comp>       
                    
                `;
            }else{
                shadow.innerHTML= `
                <div class="comentario" id="${idComentario}">
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
                <div class="comentario" id="${idComentario}">
                        <img src="../imgs/user.png" id="user">
                        <div class="contenido-comentario">
                            <p id="usuario-comentario">${usertag}</p>
                            <div class="imagen-comentario">
                                <img src="${imagen}" id="contenido">
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
                    <removecomm-comp comentario-id="${idComentario}" publicacion-id="${idPublicacion}"></removecomm-comp>
                    <editcomment-comp comentario-id="${idComentario}" publicacion-id="${idPublicacion}" texto="${texto}" img="${imagen}"></editcomentario-comp>     
                    
                `;
            }else{
                shadow.innerHTML= `
                <div class="comentario" id="${idComentario}">
                        <img src="../imgs/user.png" id="user">
                        <div class="contenido-comentario">
                            <p id="usuario-comentario">${usertag}</p>
                            <div class="imagen-comentario">
                                <img src="${imagen}" id="contenido">
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }

    #escucharEliminacion(idComentario){
        window.addEventListener('eliminarComentario', (event) => {
            const detalle = event.detail;
           
            const comentarioIdAEliminar = detalle.comentarioId;
         
            const comentarioElement = this.shadowRoot.getElementById(comentarioIdAEliminar);
            if (idComentario === comentarioIdAEliminar) {
                comentarioElement.remove(); 
            }
          });
    }

    #escucharActualizacion(idComentario) {
        window.addEventListener('actualizarComentario', (event) => {
            const detalle = event.detail;
            
            const comentarioIdAEditar = detalle.idComentario;
            
            if (idComentario === comentarioIdAEditar) {
                const nuevoTexto = detalle.nuevoTexto || ""; 
                const nuevoImagen = detalle.nuevaImagen || ''; 
                console.log("imagen recuperada:"+nuevoImagen);
                const comentarioElement = this.shadowRoot.getElementById(idComentario);
                if (comentarioElement) {
                    const textoComentario = comentarioElement.querySelector(".texto-comentario p");
                    const imagenComentario = comentarioElement.querySelector(".imagen-comentario img");
    
                    if (textoComentario) {
                        textoComentario.textContent = nuevoTexto;
                    }
                    if (imagenComentario) {
                        imagenComentario.src = nuevoImagen;
                    }
                }
            }
        });
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
        const removeComp = shadow.querySelector('removecomm-comp');
        console.log(removeComp)
        if (removeComp) {
            const modal = removeComp.shadowRoot.querySelector("#modal-publicacion");
            if (modal) {
                modal.classList.add("modal-open");
            }
        }
    }

    #openEditModal(shadow) {
        const editComp  = shadow.querySelector('editcomment-comp');

        if (editComp ) {
            const modal = editComp.shadowRoot.querySelector("#modal-publicacion");
            if (modal) {
                modal.classList.add("modal-open");
                const eventoEditarComentario = new CustomEvent('editarComentario', {
                    detail: {
                        texto: this.texto,
                        imagen: this.imagen,
          
                    }
                });
    
                editComp.dispatchEvent(eventoEditarComentario);
            }
        }
    }
}

customElements.define('publication-comment', PublicationComment);