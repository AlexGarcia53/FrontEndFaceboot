import { obtenerPublicacion } from '../../services/publicacionService.js';
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

        this.#recuperarPublicacion(shadow);
        // this.#render(shadow);
        this.#agregaEstilo(shadow);
    }

    #render(shadow, publicacion, comentarios){
        shadow.innerHTML = `
            <div class="publicacion-contenedor">
                <publication-header usertag="${publicacion.usuarioID}" fechaCreacion="${publicacion.fechaCreacion}" creador="${true}"></publication-header>
                <publication-content texto="${publicacion.texto}" imagen="${publicacion.img}"></publication-content>
                <div class="comentarios-publicacion">
                    <hr>
                    ${comentarios}
                    <hr>
                </div>
                <comment-publication></comment-publication>
            </div>
        `; 
    }

    #agregaEstilo(shadow){
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../css/publicationHeader.css');
        shadow.appendChild(link);
    }

    async #recuperarPublicacion(shadow){
        try {
            const publicacion = await obtenerPublicacion();
            if (publicacion) {
                console.log(publicacion)
                if(publicacion.hasOwnProperty('comentarios') && Array.isArray(publicacion.comentarios)){
                    const comentarios= publicacion.comentarios;
                    let comentariosHTML= '';
                    comentarios.forEach(comentario => {
                        comentariosHTML+=`<publication-comment usertag="${comentario.usuarioID}" texto="${comentario.texto}" imagen="${comentario.img}"></publication-comment>`
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