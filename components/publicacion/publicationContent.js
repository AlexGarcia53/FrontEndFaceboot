class PublicationContent extends HTMLElement {
    
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({ mode: 'open' });

        const texto= this.getAttribute('texto');
        const imagen= this.getAttribute('imagen');
        this.#render(shadow, texto, imagen);
        this.#agregaEstilo(shadow);
    }

    #render(shadow, texto, imagen){
        if((texto!==undefined && texto!==null && texto.trim()!=='') && 
        (imagen!==undefined && imagen!==null && imagen.trim()!=='')){
            shadow.innerHTML = `
                <div class="texto-publicacion">
                    <p>${texto}</p>
                </div>
                <div class="imagen-publicacion">
                    <hr>
                    <img src="${imagen}" id="contenido">
                    <hr>
                </div>
            `;
        }else if((texto!==undefined && texto!==null && texto.trim()!=='') &&
        (imagen===undefined || imagen===null || imagen.trim()==='')){
            shadow.innerHTML= `
                <div class="texto-publicacion">
                    <p>${texto}</p>
                </div>
            `;
        }else if((texto===undefined || texto===null || texto.trim()==='') &&
        (imagen!==undefined && imagen!==null && imagen.trim()!=='')){
            shadow.innerHTML= `
                <div class="imagen-publicacion">
                    <hr>
                    <img src="${imagen}" id="contenido">
                    <hr>
                </div>
            `;
        }
    }

    #agregaEstilo(shadow){
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../css/publicationHeader.css');
        shadow.appendChild(link);
    }
}

customElements.define('publication-content', PublicationContent);