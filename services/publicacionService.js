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