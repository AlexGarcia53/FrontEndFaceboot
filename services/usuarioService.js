
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




