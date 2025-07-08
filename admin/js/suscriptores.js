document.addEventListener("DOMContentLoaded", () => {
    const listaSuscripciones = document.getElementById("listaSuscripciones");
    const URL_API = "http://localhost:3000/suscripciones";
  
    async function cargarSuscripciones() {
      try {
        const response = await fetch(URL_API);
        const suscripciones = await response.json();
  
        listaSuscripciones.innerHTML = ""; 
  
        suscripciones.forEach((s, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${s.email}</td>
            <td>${s.fecha}</td>
          `;
          listaSuscripciones.appendChild(row);
        });
      } catch (error) {
        console.error("Error al cargar suscripciones:", error);
      }
    }
  
    cargarSuscripciones();
  });
  
