import { obtenerPublicacion } from '../../services/publicacionService.js';
import { obtenerUsuarioDesdeToken } from '../../services/usuarioService.js';
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
        console.log(publication);
        const comentarios= this.#organizarComentarios(shadow, publication);
        this.#render(shadow, publication, comentarios);
        this.#agregaEstilo(shadow);
    }

    #render(shadow, publicacion, comentarios){
        const token = localStorage.getItem('jwtToken');
        const usuario = obtenerUsuarioDesdeToken(token);
        const creador= usuario.userId===publicacion.usertag;
        shadow.innerHTML = `
        <br>
            <div class="publicacion-contenedor">
                <publication-header usertag="${publicacion.usertag}" fechaCreacion="${publicacion.fechaCreacion}" creador="${creador}"></publication-header>
                <publication-content texto="${publicacion.texto===undefined || publicacion.texto=== null ? "" : publicacion.texto}" 
                imagen="${publicacion.img===undefined || publicacion.img===null ? "" : publicacion.img}"></publication-content>
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

    #organizarComentarios(shadow, publicacion){
        const token = localStorage.getItem('jwtToken');
        const usuario = obtenerUsuarioDesdeToken(token);
        if (publicacion.hasOwnProperty('comentarios') && Array.isArray(publicacion.comentarios)) {
            const comentarios = publicacion.comentarios;
            let comentariosHTML = '';
            comentarios.forEach(comentario => {
                const creador= usuario.userId===comentario.usertag;
                comentariosHTML += `<publication-comment usertag="${comentario.usertag}" texto="${comentario.texto === undefined || comentario.texto === null ? "" : comentario.texto}" 
                    imagen="${comentario.img === undefined || comentario.img === null ? "" : comentario.img}" creador="${creador}"></publication-comment>`
            });
            this.#agregaEstilo(shadow);
            return comentariosHTML;
        }else{
            return "";
        }
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