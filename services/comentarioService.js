
export async function addComment(usertag, texto, img, fechaCreacion, id) {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        alert('Token no encontrado. Inicia sesión para obtener uno.');
        return;
    }

    const url = `http://localhost:2222/api/v2/publicacion/${id}/comentario`;

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                usertag: usertag,
                texto: texto,
                img: img,
                fechaCreacion: fechaCreacion
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error);
            throw new Error(data.error);
        }

        console.log(data);
        return data;
    } catch (error) {
        console.error('Error al registrar comentario:', error.message);
        throw error;
    }
}

export async function editComment(usertag, texto, img, fechaCreacion, idPublicacion, idComentario) {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        alert('Token no encontrado. Inicia sesión para obtener uno.');
        return;
    }
    
    const url = `http://localhost:2222/api/v2/publicacion/${idPublicacion}/comentario/${idComentario}`;
    console.log(url);

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                usertag: usertag,
                texto: texto,
                img: img,
                fechaCreacion: fechaCreacion
            
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error);
            throw new Error(data.error);
        }

        console.log(data);
        return data;
    } catch (error) {
        
        console.error('Error al editar comentario:', error.message);
        throw error;
    }
}

export async function deleteComment(publicacionId, comentarioId) {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        alert('Token no encontrado. Inicia sesión para obtener uno.');
        return;
    }

    const url = `http://localhost:2222/api/v2/publicacion/${publicacionId}/comentario/${comentarioId}`;
    console.log(url +"ea");
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    
        if (!response.ok) {
            const data = await response.json();
            console.error('Error al eliminar:', data.error);
        } else {
            console.log('Comentario eliminado exitosamente');
        }
    } catch (error) {
        console.error('Error en la solicitud DELETE:', error.message);
    }
}

export async function obtenerComentarioReciente(id) {
    const token = localStorage.getItem('jwtToken');

    if (!token) {      
        alert('Token no encontrado. Inicia sesión para obtener uno.');  
        return;
    }
    
    const url = `http://localhost:2222/api/v2/publicacion/${id}/nuevo`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        const data = await response.json();

        if (!response.ok) {
            alert(data.error); 
            throw new Error(data.error);
        }
        console.log(data+"aqui la data")
        return data; 
    } catch (error) {
        console.error('Error al obtener comentario:', error.message);
        throw error;
    }
}
