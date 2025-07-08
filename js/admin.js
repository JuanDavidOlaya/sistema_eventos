document.addEventListener("DOMContentLoaded", () => {
   
    // Funcionalidad de Autenticación: Cerrar Sesión
    
    const botonCerrarSesion = document.querySelector(".sidebar a[href$='login.html']"); 

    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
    const listaEventos = document.getElementById('listaEventos');
    function renderTable (){

        listaEventos.innerHTML = '';

        eventos.forEach(event => {
            const row = document.createElement("tr")
            row.innerHTML = `  
    
                    <td>${event.id}</td>
                    <td>${event.titulo}</td>
                    <td>${event.fecha}</td>
                    <td>${event.estado}</td>
                    <td>${event.descripcion}</td>
                    `
            listaEventos.appendChild(row)
        });
    
    }
    renderTable()

   
     
    if (botonCerrarSesion) {
      botonCerrarSesion.addEventListener("click", (e) => {
        e.preventDefault(); 
        sessionStorage.removeItem("userActive"); 
        alert("Sesión cerrada correctamente.");
        location.href = "../login.html"; 
      });
    }
  
    
    // Funcionalidad de Gestión de Eventos: Crear
   
    const formEvento = document.getElementById("formEvento");
  
    // Solo si el formulario existe en la página actual
    if (formEvento) {
      formEvento.addEventListener("submit", (e) => {
        e.preventDefault();
  
        // 1. Obtener valores del formulario
        // El campo eventoId será útil para 'Actualizar' eventos existentes
        const eventoId = document.getElementById("eventoId").value; 
        const titulo = document.getElementById("titulo").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
        const imagen = document.getElementById("imagen").value.trim();
        const fecha = document.getElementById("fecha").value.trim();
        const estado = document.getElementById("estado").value;
  
        // Simple validación de campos vacíos
        if (!titulo || !descripcion || !imagen || !fecha || !estado) {
          alert("Por favor, completa todos los campos del formulario.");
          return; // Detiene la ejecución si faltan campos
        }
  
        // 2. Crear objeto evento
        const nuevoEvento = {
          // Asigna un ID único; si eventoId ya existe (para edición), lo usa
          id: eventoId || Date.now().toString(), 
          titulo,
          descripcion,
          imagen,
          fecha,
          estado
        };
  
        // 3. Obtener eventos actuales de localStorage
        // Si no hay eventos guardados, inicializa un array vacío
        
  
        // 4. Añadir o Actualizar el evento
        if (eventoId) {
          // Lógica para actualizar un evento existente
          const index = eventos.findIndex(e => e.id === eventoId);
          if (index !== -1) {
            eventos[index] = nuevoEvento; 
            alert("Evento actualizado con éxito!");
          }
        } else {
          // Lógica para crear un nuevo evento
          eventos.push(nuevoEvento); // Añade el nuevo evento al array
          alert("Evento creado con éxito!");
        }
  
        // 5. Guardar el array actualizado de eventos en localStorage
        localStorage.setItem("eventos", JSON.stringify(eventos));
  
        // 6. Limpiar el formulario y cerrar el modal
        formEvento.reset(); // Restablece todos los campos del formulario a sus valores iniciales
  
        // Cierra el modal de Bootstrap
        const modalElement = document.getElementById('modalCrearEvento');
        // Obtiene la instancia del modal de Bootstrap, o crea una si no existe
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide(); // Oculta el modal

        renderTable()
  
        // Aquí, en el futuro, se llamará a una función para refrescar la tabla de eventos
        // (cuando implementemos la funcionalidad de "Leer").
      });
    }
  });


