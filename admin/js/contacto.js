document.addEventListener('DOMContentLoaded', () => {
  const tabla = document.querySelector('#lista-contactos');

  fetch('http://localhost:3000/contactos')
    .then(res => res.json())
    .then(contactos => {
      if (contactos.length === 0) {
        tabla.innerHTML = '<tr><td colspan="5">No hay mensajes registrados.</td></tr>';
        return;
      }

      contactos.forEach((contacto, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${index + 1}</td>
          <td>${contacto.nombre}</td>
          <td>${contacto.correo}</td>
          <td>${contacto.mensaje}</td>
          <td>
            ${new Date(contacto.fecha).toLocaleString()}
            <button class="btn btn-sm btn-danger ms-2 eliminar" data-id="${contacto.id}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;
        tabla.appendChild(fila);
      });
    })
    .catch(err => {
      console.error('Error al cargar contactos:', err);
    });

  // Delegación de evento para eliminar
  document.addEventListener('click', e => {
    if (e.target.closest('.eliminar')) {
      const id = e.target.closest('.eliminar').dataset.id;
      if (confirm('¿Eliminar este mensaje de contacto?')) {
        fetch(`http://localhost:3000/contactos/${id}`, { method: 'DELETE' })
          .then(() => location.reload());
      }
    }
  });
});
