export async function obtenerPublicacion() {
    const token = localStorage.getItem('jwtToken');

    if (!token) {      
        alert('Token no encontrado. Inicia sesión para obtener uno.');  
        return;
    }
    
    const url = 'http://localhost:2222/api/v2/publicacion/651ce36b9be41c0ebdc0c8e1';

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