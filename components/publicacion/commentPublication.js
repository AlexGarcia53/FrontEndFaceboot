class CommentPublication extends HTMLElement {
    
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({ mode: 'open' });

        this.#render(shadow);
        this.#agregaEstilo(shadow);
    }

    #render(shadow){
        shadow.innerHTML = `
            <div class="comentar-contenedor">
                <img src="../imgs/user.png" id="user">
                <div class="agregar-comentario">
                    <p>Escribe un comentario...</p>
                </div>
            </div>
        `; 
    }

    #agregaEstilo(shadow){
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../css/publicationHeader.css');
        shadow.appendChild(link);
    }
}

customElements.define('comment-publication', CommentPublication);