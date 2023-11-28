export async function obtenerPublicacion() {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        alert('Token no encontrado. Inicia sesión para obtener uno.');
        return;
    }

    const url = 'http://localhost:2222/api/v2/publicacion/6563e175397a557fead714b9';

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

        console.log(data);
        return data;
    } catch (error) {
        console.error('Error al obtener publicacion:', error.message);
        throw error;
    }
}

export async function addPublication(usertag, texto, img, fechaCreacion) {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        alert('Token no encontrado. Inicia sesión para obtener uno.');
        return;
    }

    const url = 'http://localhost:2222/api/v2/publicacion/crear';

    try {
        const response = await fetch(url, {
            method: "POST",
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
        console.error('Error al registrar publicacion:', error.message);
        throw error;
    }
}

export async function editPublication(usertag, texto, img, id) {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        alert('Token no encontrado. Inicia sesión para obtener uno.');
        return;
    }

    const url = `http://localhost:2222/api/v2/publicacion/${id}`;

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

export async function obtenerPublicacionesIndice(indice) {
    const token = localStorage.getItem('jwtToken');

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

        console.log(data); 
        return data; 
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        throw error;
    }
}

export async function deletePublication(id) {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        alert('Token no encontrado. Inicia sesión para obtener uno.');
        return;
    }

    const url = `http://localhost:2222/api/v2/publicacion/${id}`;
    console.log(url)
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
            console.log('Publicación eliminada exitosamente');
        }
    } catch (error) {
        console.error('Error en la solicitud DELETE:', error.message);
    }
}