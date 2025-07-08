document.addEventListener("DOMContentLoaded", () => {
  const listaEventos = document.getElementById("listaEventos");
  const formEvento = document.getElementById("formEvento");
  const botonCerrarSesion = document.querySelector(".sidebar a[href$='login.html']");
  const URL_API = "http://localhost:3000/eventos";

  let eventos = [];

  async function cargarEventos() {
    try {
      const response = await fetch(URL_API);
      const data = await response.json();

      const hoy = new Date().toISOString().split('T')[0];

      // Si la fecha ya pasó y el estado no es "finalizado", lo actualizamos
      for (const evento of data) {
        if (evento.fecha < hoy && evento.estado !== 'finalizado') {
          await fetch(`${URL_API}/${evento.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado: "finalizado" }),
          });
        }
      }

      // Usamos los datos ya obtenidos
      eventos = await fetch(URL_API).then(r => r.json());
      renderTable();

    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  }

  function renderTable() {
    listaEventos.innerHTML = "";

    eventos.forEach((event) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${event.id}</td>
        <td>${event.titulo}</td>
        <td>${event.fecha}</td>
        <td>
          <select class="form-select form-select-sm estado-selector" data-id="${event.id}">
            <option value="activo" ${event.estado === "activo" ? "selected" : ""}>Activo</option>
            <option value="inactivo" ${event.estado === "inactivo" ? "selected" : ""}>Inactivo</option>
            <option value="cancelado" ${event.estado === "cancelado" ? "selected" : ""}>Cancelado</option>
            <option value="finalizado" ${event.estado === "finalizado" ? "selected" : ""}>Finalizado</option>
          </select>
        </td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="eliminarEvento('${event.id}')">
            <i class="bi bi-trash"></i> Eliminar
          </button>
        </td>
      `;

      listaEventos.appendChild(row);
    });

    // Manejador para cambio de estado manual
    document.querySelectorAll('.estado-selector').forEach(select => {
      select.addEventListener('change', async function () {
        const nuevoEstado = this.value;
        const id = this.getAttribute('data-id');

        try {
          await fetch(`${URL_API}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado: nuevoEstado }),
          });
          alert("Estado actualizado correctamente");
        } catch (error) {
          console.error("Error al cambiar estado:", error);
          alert("No se pudo actualizar el estado.");
        }
      });
    });
  }

  // Crear o editar evento
  if (formEvento) {
    formEvento.addEventListener("submit", async (e) => {
      e.preventDefault();

      const eventoId = document.getElementById("eventoId").value;
      const titulo = document.getElementById("titulo").value.trim();
      const descripcion = document.getElementById("descripcion").value.trim();
      const imagen = document.getElementById("imagen").value.trim();
      const fecha = document.getElementById("fecha").value.trim();
      const estado = document.getElementById("estado").value;

      if (!titulo || !descripcion || !imagen || !fecha || !estado) {
        alert("Por favor, completa todos los campos del formulario.");
        return;
      }

      const nuevoEvento = { titulo, descripcion, imagen, fecha, estado };

      try {
        if (eventoId) {
          // PUT - Actualizar
          await fetch(`${URL_API}/${eventoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: eventoId, ...nuevoEvento }),
          });
          alert("Evento actualizado con éxito!");
        } else {
          // POST - Crear
          await fetch(URL_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoEvento),
          });
          alert("Evento creado con éxito!");
        }

        formEvento.reset();
        const modalElement = document.getElementById("modalCrearEvento");
        const modalInstance =
          bootstrap.Modal.getInstance(modalElement) ||
          new bootstrap.Modal(modalElement);
        modalInstance.hide();
        cargarEventos();
      } catch (error) {
        console.error("Error al guardar el evento:", error);
      }
    });
  }

  // Cerrar sesión
  if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.removeItem("userActive");
      alert("Sesión cerrada correctamente.");
      location.href = "../login.html";
    });
  }

  cargarEventos();
});

// Función global para eliminar
async function eliminarEvento(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este evento?")) {
    try {
      await fetch(`http://localhost:3000/eventos/${id}`, {
        method: "DELETE",
      });
      alert("Evento eliminado correctamente.");
      document.addEventListener("DOMContentLoaded", () => cargarEventos());
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  }
}
