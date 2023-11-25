
export async function login(username, contrasenia) {
    const url = 'http://localhost:2222/auth/iniciarSesion/';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                contrasenia: contrasenia
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
        console.error('Error al iniciar sesión:', error.message);
        throw error;
    }
}

export async function register(usertag, username, contrasenia, sexo, fechaNacimiento) {
    const url = 'http://localhost:2222/api/v2/usuario/';

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usertag: usertag,
                username: username,
                contrasenia: contrasenia,
                sexo: sexo,
                fechaNacimiento: fechaNacimiento
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
        console.error('Error al registrar:', error.message);
        throw error;
    }
}

export function obtenerUsuarioDesdeToken(token) {
    try {
        const payloadBase64 = token.split('.')[1];
        const payload = atob(payloadBase64);
        const usuario = JSON.parse(payload);
        return usuario;
    } catch (error) {
        console.error('Error al decodificar el token:', error.message);
        throw error;
    }
}

export async function crearPublicacion(fechaCreacion, texto, img) {
    
    const token = localStorage.getItem('jwtToken');

    if (!token) {      
        alert('Token no encontrado. Inicia sesión para obtener uno.');  
        return;
    }

    const url = 'http://localhost:2222/api/v2/publicacion/crear';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                fechaCreacion: fechaCreacion,
                texto: texto,
                img: img
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
        console.error('Error al crear publicación:', error.message);
        throw error;
    }
}



