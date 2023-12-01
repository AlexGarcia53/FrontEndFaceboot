import { obtenerUsuarioDesdeToken } from '../../services/usuarioService.js';

async function verificarExpiracionToken() {
    const token = sessionStorage.getItem('jwtToken');

    if (token) {
        const usuario = obtenerUsuarioDesdeToken(token);

        if (usuario && usuario.exp) {
            const fechaExpiracion = new Date(usuario.exp * 1000); 
            const fechaActual = new Date();

            if (fechaExpiracion < fechaActual) {
                window.location.href = 'login.html';
            }
        }
    }
}

verificarExpiracionToken();