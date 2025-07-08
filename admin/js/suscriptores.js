document.addEventListener('DOMContentLoaded', () => {
  const tabla = document.querySelector('#lista-suscripciones');

  fetch('http://localhost:3000/suscripciones')
    .then(res => res.json())
    .then(suscripciones => {
      if (suscripciones.length === 0) {
        tabla.innerHTML = '<tr><td colspan="3">No hay suscripciones registradas.</td></tr>';
        return;
      }

      suscripciones.forEach((sub, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${index + 1}</td>
          <td>${sub.correo}</td>
          <td>
            ${new Date(sub.fecha || Date.now()).toLocaleString()}
            <button class="btn btn-sm btn-danger ms-2 eliminar" data-id="${sub.id}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;
        tabla.appendChild(fila);
      });
    })
    .catch(err => {
      console.error('Error al cargar suscripciones:', err);
    });

  // Delegación de evento para eliminar
  document.addEventListener('click', e => {
    if (e.target.closest('.eliminar')) {
      const id = e.target.closest('.eliminar').dataset.id;
      if (confirm('¿Eliminar esta suscripción?')) {
        fetch(`http://localhost:3000/suscripciones/${id}`, { method: 'DELETE' })
          .then(() => location.reload());
      }
    }
  });
});
