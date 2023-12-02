import { obtenerPublicacion } from '../../services/publicacionService.js';
import { obtenerUsuarioDesdeToken } from '../../services/usuarioService.js';
import { obtenerComentarioReciente } from '../../services/comentarioService.js';
import '../publicacion/commentPublication.js'
import '../publicacion/publicationComment.js'
import '../publicacion/publicationContent.js'
import '../publicacion/publicationHeader.js'

class Publication extends HTMLElement {
    
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({ mode: 'open' });

        var publication= JSON.parse(this.getAttribute('publication'));
   
        const comentarios= this.#organizarComentarios(shadow, publication);
        this.#render(shadow, publication, comentarios);

        window.addEventListener('agregarComentario', (event) => {
            const { idPublicacion } = event.detail;
            
            this.#obtenerComentario(idPublicacion, publication);
        });

        this.#agregaEstilo(shadow);
    }

    #render(shadow, publicacion, comentarios){
        const token = sessionStorage.getItem('jwtToken');
        const usuario = obtenerUsuarioDesdeToken(token);
        const creador= usuario.userId===publicacion.usertag;
        shadow.innerHTML = `
        <br>
            <div class="publicacion-contenedor">
                <publication-header usertag="${publicacion.usertag}" fechaCreacion="${publicacion.fechaCreacion}" creador="${creador}" _id="${publicacion._id}" texto="${publicacion.texto}" img="${publicacion.img}"></publication-header>
                <publication-content texto="${publicacion.texto===undefined || publicacion.texto=== null ? "" : publicacion.texto}" 
                imagen="${publicacion.img===undefined || publicacion.img===null ? "" : publicacion.img}"></publication-content>
                <div class="comentarios-publicacion">
                    <hr>
                    ${comentarios}
                    <div class="nuevos"> </div>
                    <hr>
                </div>
                <comment-publication _id="${publicacion._id}"></comment-publication>
            </div>
        `; 
    }

    #agregaEstilo(shadow){
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../css/publicationHeader.css');
        shadow.appendChild(link);
    }

    #organizarComentarios(shadow, publicacion){
        const token = sessionStorage.getItem('jwtToken');
        const publicacionID = publicacion._id;
        const usuario = obtenerUsuarioDesdeToken(token);
        if (publicacion.hasOwnProperty('comentarios') && Array.isArray(publicacion.comentarios)) {
            const comentarios = publicacion.comentarios;
            let comentariosHTML = '';
            comentarios.forEach(comentario => {
                const creador = usuario.userId === comentario.usertag;
                comentariosHTML += `<publication-comment usertag="${comentario.usertag}" texto="${comentario.texto === undefined || comentario.texto === null ? "" : comentario.texto}" 
                    imagen="${comentario.img === undefined || comentario.img === null ? "" : comentario.img}" creador="${creador}" comentario-id="${comentario._id}" publicacion-id="${publicacionID}"></publication-comment>`        
            });
            
            this.#agregaEstilo(shadow);
            return comentariosHTML;
        }else{
            return "";
        }
    }

    async #obtenerComentario(idPublicacion, publicacion) {
        try {
            const response = await obtenerComentarioReciente(idPublicacion);
          
    
            const token = sessionStorage.getItem('jwtToken');
            const usuario = obtenerUsuarioDesdeToken(token);
            const creador = usuario.userId === response.comentario.usertag;
            
            const comentarioPrueba = {
                usertag: response.comentario.usertag,
                texto: response.comentario.texto,
                imagen: response.comentario.img || '',
                creador: creador,
                comentarioId: response.comentario._id,
                publicacionId: response.publicacionId
            };

            if(response.publicacionId === publicacion._id){
                this.#agregarComentarioAlDOM(comentarioPrueba, idPublicacion);
            }
  
        } catch (error) {
            console.error(error);
        }
    }
    #agregarComentarioAlDOM(comentario, idPublicacion) {
     
        const publicacionContainer = this.shadowRoot.querySelector('.nuevos');

       
        const nuevoComentario = document.createElement('publication-comment');
        nuevoComentario.setAttribute('usertag', comentario.usertag);
        nuevoComentario.setAttribute('texto', comentario.texto);
        nuevoComentario.setAttribute('imagen', comentario.imagen);
        nuevoComentario.setAttribute('creador', comentario.creador);
        nuevoComentario.setAttribute('comentario-id', comentario.comentarioId);
        nuevoComentario.setAttribute('publicacion-id', idPublicacion);
       
        publicacionContainer.appendChild(nuevoComentario);
    }


    async #recuperarPublicacion(shadow){
        try {
            const publicacion = await obtenerPublicacion();
            if (publicacion) {
             
                if(publicacion.hasOwnProperty('comentarios') && Array.isArray(publicacion.comentarios)){
                    const comentarios= publicacion.comentarios;
                    let comentariosHTML= '';
                    comentarios.forEach(comentario => {
                        comentariosHTML+=`<publication-comment usertag="${comentario.usertag}" texto="${comentario.texto===undefined || comentario.texto===null ? "" : comentario.texto}" 
                        imagen="${comentario.img===undefined || comentario.img===null ? "" : comentario.img}"></publication-comment>`
                    });
                    
                    this.#render(shadow, publicacion, comentariosHTML);
                    this.#agregaEstilo(shadow);
                }
            } else {
                alert('Las credenciales son incorrectas');
            }
        } catch (error) {
            console.error(error);
        }
    }
}

customElements.define('user-publication', Publication);