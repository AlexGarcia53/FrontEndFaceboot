var indice= 0;

document.addEventListener("DOMContentLoaded", function() {
    recuperarPublicaciones();
});

async function recuperarPublicaciones() {
    try{
        indice+=1;
        const publicaciones= await obtenerPublicacionesIndice(indice);
        const contenedorPublicaciones= document.getElementById('contenedor-publicaciones');
        if(publicaciones){
            publicaciones.forEach(publicacion => {
                var publicacionString= JSON.stringify(publicacion);
                console.log(publicacionString);
                contenedorPublicaciones.insertAdjacentHTML('beforeend', `<user-publication publication='${publicacionString}'></user-publication>`);
            });
        }else{
            console.log("Ya no hay publicaciones papu");
        }
    } catch(error){
        throw error;
    }
}

async function obtenerPublicacionesIndice(indice) {
    const token = sessionStorage.getItem('jwtToken');

    if (!token) {      
        alert('Token no encontrado. Inicia sesión para obtener uno.');  
        return;
    }
    
    const url = 'http://localhost:2222/api/v2/publicacion/paginada/'+indice;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error); 
            throw new Error(data.error);
        }

        //console.log(data); 
        return data; 
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        throw error;
    }
}


