document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('dashboard-cards');

  Promise.all([
    fetch('http://localhost:3000/eventos').then(r => r.json()),
    fetch('http://localhost:3000/suscripciones').then(r => r.json()),
    fetch('http://localhost:3000/contactos').then(r => r.json())
  ])
  .then(([eventos, suscripciones, contactos]) => {
    const activos = eventos.filter(e => e.estado === 'activo').length;
    const cancelados = eventos.filter(e => e.estado === 'cancelado').length;
    const inactivos = eventos.filter(e => e.estado === 'inactivo').length;
    const totalEventos = eventos.length;

    const tarjetas = [
      { titulo: 'eventos activos', valor: activos },
      { titulo: 'eventos cancelados', valor: cancelados },
      { titulo: 'eventos inactivos', valor: inactivos },
      { titulo: 'eventos en total', valor: totalEventos },
      { titulo: 'Correos registrados', valor: suscripciones.length },
      { titulo: 'Mensajes de contacto', valor: contactos.length },
    ];

    contenedor.innerHTML = tarjetas.map(t => `
      <div class="col-md-4 col-lg-3">
        <div class="border text-center p-3 rounded bg-dark text-light">
          <h5>${t.valor} ${t.titulo.includes('eventos') ? '' : ''}</h5>
          <p class="mb-0">${t.titulo}</p>
        </div>
      </div>
    `).join('');
  })
  .catch(err => {
    console.error('Error al cargar resumen:', err);
    contenedor.innerHTML = '<p>Error al cargar el resumen.</p>';
  });
});
