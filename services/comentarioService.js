
export async function addComment(usertag, texto, img, fechaCreacion, id) {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        alert('Token no encontrado. Inicia sesión para obtener uno.');
        return;
    }

    const url = `http://localhost:2222/api/v2/publicacion?id=${id}/comentario`;

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

export async function editComment(usertag, texto, img, idPublicacion, idComentario) {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        alert('Token no encontrado. Inicia sesión para obtener uno.');
        return;
    }

    const url = `http://localhost:2222/api/v2/publicacion?publicacionId=${idPublicacion}/comentario?comentarioId=${idComentario}`;

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
        console.error('Error al editar publicacion:', error.message);
        throw error;
    }
}