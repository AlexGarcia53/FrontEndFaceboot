class PublicationHeader extends HTMLElement {
    
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({ mode: 'open' });

        const usertag= this.getAttribute('usertag');
        const fechaCreacion= this.getAttribute('fechaCreacion');
        const creador= this.getAttribute('creador') === 'true';
        this.#render(shadow, usertag, fechaCreacion, creador);
        this.#agregaEstilo(shadow);
    }

    #render(shadow, usertag, fechaCreacion, creador){
        if(creador===true){
            shadow.innerHTML = `
                <div class="perfil-usuario">
                    <img src="../imgs/user.png" id="user">
                    <div>
                        <p id="usertag">${usertag}</p>
                        <small id="username">${fechaCreacion}</small>
                    </div>
                    <div class="options_dropdown">
                    <img src="../imgs/option.png" id="options">
                    <div class="options_dropdown_content">
                        <a href="">Editar</a>
                        <a href="">Eliminar</a>
                    </div>
                </div>
                </div>
            `;
        }else{
            shadow.innerHTML= `
                <div class="perfil-usuario">
                    <img src="../imgs/user.png" id="user">
                    <div>
                        <p id="usertag">${usertag}</p>
                        <small id="username">${fechaCreacion}</small>
                    </div>
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

customElements.define('publication-header', PublicationHeader);