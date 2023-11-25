import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';

// Reemplaza 'http://localhost:3000' con la URL de tu servidor Socket.io
const socket = io('http://localhost:2222');

// Evento para manejar la conexión exitosa
socket.on('connect', () => {
  console.log('Conectado al servidor de Socket.io');
});

// Evento para manejar mensajes del servidor
socket.on('mensaje', (mensaje) => {
  console.log('Mensaje del servidor:', mensaje);
});

// Enviar un mensaje al servidor
document.getElementById('enviarMensaje').addEventListener('click', () => {
  const mensaje = document.getElementById('mensajeInput').value;
  socket.emit('mensaje_desde_cliente', mensaje);
});