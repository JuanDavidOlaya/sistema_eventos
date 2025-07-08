document.addEventListener("DOMContentLoaded", () => {
    const listaMensajes = document.getElementById("listaMensajes");
    const URL_API = "http://localhost:3000/contactos";
  
    async function cargarContactos() {
      try {
        const response = await fetch(URL_API);
        const contactos = await response.json();
  
        listaMensajes.innerHTML = ""; // limpia la tabla
  
        contactos.forEach((contacto, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${contacto.nombre}</td>
            <td>${contacto.email}</td>
            <td>${contacto.mensaje}</td>
            <td>${contacto.fecha}</td>
          `;
          listaMensajes.appendChild(row);
        });
      } catch (error) {
        console.error("Error al cargar contactos:", error);
      }
    }
  
    cargarContactos();
  });
  
