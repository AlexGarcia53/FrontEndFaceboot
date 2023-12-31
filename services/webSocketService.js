
const socket = io('http://localhost:3211');

 
    socket.on('comentarioEliminado', (data) => {
      const comentarioId = data.idComentario;


      const eventoEliminarComentario = new CustomEvent('eliminarComentario', {
        detail: { comentarioId }
      });

      window.dispatchEvent(eventoEliminarComentario);
    });

    socket.on('comentarioAgregado', (data) => {
      const idPublicacion = data.idPublicacion;
      const eventoAgregarComentario = new CustomEvent('agregarComentario', {
        detail: { idPublicacion }
      });

      window.dispatchEvent(eventoAgregarComentario);
    });

    socket.on('comentarioEditado', (data) => {
      const idComentario = data.idComentario;
      const nuevoTexto = data.nuevoTexto;
      const nuevaImagen = data.nuevaImagen;

      const eventoActualizarComentario = new CustomEvent('actualizarComentario', {
        detail: { idComentario, nuevoTexto, nuevaImagen }
      });

      window.dispatchEvent(eventoActualizarComentario);
    });

