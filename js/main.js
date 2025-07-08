// Función para agregar eventos dinámicamente
function cargarEventos() {
  fetch('http://localhost:3000/eventos')
    .then(response => response.json())
    .then(eventos => {
      const contenedor = document.querySelector('.events');
      contenedor.innerHTML = ''; // limpiar antes de agregar
      eventos.forEach(e => {
        const hoy = new Date().toISOString().split('T')[0]; // Fecha actual

        if (e.fecha < hoy) return; // Si el evento ya pasó, NO lo mostramos

        const div = document.createElement('div');
        div.classList.add('event');
        div.innerHTML = `
        <h4 class="event__id">ID: ${e.id}</h4>
        <img src="${e.imagen}" alt="Imagen evento" class="event__image">
        <h3 class="event__title">${e.titulo}</h3>
        <p class="event__description">${e.descripcion}</p>
        <p class="event__date">Fecha: ${e.fecha}</p>
        <p class="event__status">Estado: ${e.estado}</p>
        <button type="button" class="event__toggle">Ver más</button>
        <a href="${e.link}" class="event__link">Ver detalles</a>
      `;
        contenedor.appendChild(div);
      });

    })
    .catch(error => console.error('Error al cargar eventos:', error));
}

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  cargarEventos();
  enviarContacto(); // ← Ejecutamos aquí
});


// Escuchar clicks en todos los botones Ver más/Ver menos
// Escuchar clicks en todos los botones Ver más/Ver menos
document.addEventListener('click', function (e) {
  if (e.target.matches('.event__toggle')) {
    const eventCard = e.target.closest('.event'); // buscar el div .event
    const desc = eventCard.querySelector('.event__description'); // buscar la descripción

    desc.classList.toggle('expanded');
    e.target.textContent = desc.classList.contains('expanded') ? 'Ver menos' : 'Ver más';
  }
});


// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', cargarEventos);

// Función para crear cada tarjeta de evento
function crearEvento(evento) {
  const contenedor = document.querySelector(".events");
  const div = document.createElement("div");
  div.classList.add("event");
  div.innerHTML = `
    <img src="${evento.imagen}" alt="${evento.titulo}" class="event__image">
    <h3 class="event__title">${evento.titulo}</h3>
    <p class="event__description">${evento.descripcion}</p>
    <a href="${evento.link}" class="event__link">Ver detalles</a>
  `;
  contenedor.appendChild(div);
}
// Carrusel de imágenes
const imagenes = [
  "https://template.canva.com/EAFcn2Jk5TY/2/0/1600w-waOGgi87JjY.jpg",
  "https://template.canva.com/EAFE_7DXHAc/1/0/1600w-NupVJDa4Oqs.jpg",
  "https://template.canva.com/EAGGnT4F_CM/4/0/1600w-xeL-rStR0NM.jpg"
];

let indice = 0;
const imagenCarrusel = document.querySelector(".carousel__image");
const botonPrev = document.getElementById("carousel-prev");
const botonNext = document.getElementById("carousel-next");

function cambiarImagen(nuevoIndice) {
  imagenCarrusel.classList.add("fade-out");

  setTimeout(() => {
    indice = nuevoIndice;
    imagenCarrusel.src = imagenes[indice];
    imagenCarrusel.classList.remove("fade-out");
  }, 300); // Tiempo de la animación
}

function mostrarSiguiente() {
  const nuevo = (indice + 1) % imagenes.length;
  cambiarImagen(nuevo);
}

function mostrarAnterior() {
  const nuevo = (indice - 1 + imagenes.length) % imagenes.length;
  cambiarImagen(nuevo);
}

// Eventos de botones
botonPrev.addEventListener("click", mostrarAnterior);
botonNext.addEventListener("click", mostrarSiguiente);

// Inicializar carrusel
cambiarImagen(0);

// Autoplay cada 5 segundos
setInterval(mostrarSiguiente, 5000);

const correoInput = document.getElementById('correo');

correoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // evita que se envíe un formulario si existe

    const correo = correoInput.value.trim();

    // Patrón básico para validar formato de correo
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correo) {
      alert('Por favor ingresa un correo.');
      return;
    }

    if (!patronCorreo.test(correo)) {
      alert('El correo no tiene un formato válido.');
      return;
    }

    // Enviar al JSON Server
    fetch('http://localhost:3000/suscripciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo })
    })
      .then(response => {
        if (response.ok) {
          alert('¡Gracias por suscribirte!');
          correoInput.value = ''; // limpiar campo
        } else {
          alert('Error al guardar el correo.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('No se pudo conectar con el servidor.');
      });
  }
});
// Función para enviar formulario de contacto
function enviarContacto() {
  const form = document.querySelector('#form-contacto');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre')?.value.trim();
    const correo = document.querySelector('#correo')?.value.trim();
    const mensaje = document.querySelector('#mensaje')?.value.trim();

    if (!nombre || !correo || !mensaje) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const nuevoContacto = {
      id: generarID(),
      nombre,
      correo,
      mensaje,
      fecha: new Date().toISOString()
    };

    fetch('http://localhost:3000/contactos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoContacto)
    })
      .then(res => {
        if (res.ok) {
          alert('Mensaje enviado correctamente');
          form.reset();
        } else {
          alert('Error al enviar el mensaje');
        }
      })
      .catch(() => {
        alert('Error al conectar con el servidor');
      });
  });
}

// Función auxiliar para generar IDs únicos
function generarID() {
  return Math.random().toString(36).substr(2, 9);
}


