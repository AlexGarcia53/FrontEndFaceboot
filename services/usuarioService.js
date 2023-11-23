export class UsuarioService {

    static async login(username, contrasenia) {
        const url = 'http://localhost:2222/api/v2/auth/IniciarSesion'; 
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    contrasenia: contrasenia
                })
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }

            const token = await response.json();
            console.log(token);
            return token;
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            throw error;
        }
    }
}

module.exports = UsuarioService;