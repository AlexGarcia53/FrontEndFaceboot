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
        console.log(texto, imagen);
        this.#render(shadow, usertag, texto, imagen, creador);
        this.#agregaEstilo(shadow);
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
                                <a href="">Editar</a>
                                <a href="">Eliminar</a>
                            </div>
                        </div>
                    </div>
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
                                <a href="">Editar</a>
                                <a href="">Eliminar</a>
                            </div>
                        </div>
                    </div>
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
                                <a href="">Editar</a>
                                <a href="">Eliminar</a>
                            </div>
                        </div>
                    </div>
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
}

customElements.define('publication-comment', PublicationComment);