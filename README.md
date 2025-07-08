# Sistema de Gestión de Eventos

Este es un sistema de gestión de eventos desarrollado en HTML, CSS y JavaScript, utilizando `JSON Server` como backend simulado. El sistema incluye un panel administrativo para crear, editar, listar y eliminar eventos, así como manejar contactos y suscripciones.

---

## 🚀 Funcionalidades

- Vista pública de eventos (solo los activos y futuros).
- Formulario de contacto y suscripción.
- Login de administrador.
- Panel administrativo:
  - Crear, editar y eliminar eventos.
  - Cambiar el estado de eventos (activo, inactivo, cancelado, finalizado).
  - Eventos pasados se marcan automáticamente como "finalizado".
  - Ver y eliminar contactos y suscripciones.

---

## 📦 Instalación y uso 

1. **Clonar el repositorio**

git clone https://github.com/juandavidolaya/sistema_eventos.git
cd sistema_eventos

## 2 .Instalar JSON Server

Si no tienes json-server instalado globalmente, instálalo:

npm install -g json-server

## 3. Ejecutar el servidor JSON

Dentro del proyecto, ejecuta: json-server --watch db.json --port 3000
Esto iniciará el backend local en: http://localhost:3000

## 🌐 Acceso al sistema
🔐 Login de administrador (Por URL privada)

El login debe hacerse desde esta URL (hosteada en GitHub Pages):

🔗 https://juandavidolaya.github.io/sistema_eventos/login.html

Si se quiere hacer usando el live server de VIsual Studio Code, esta sera la URL: 
 ***puerto local del live server*** seguido de /index.html
### Ejemplo
http://124.1.1.2:5501/login.html
### ⚠️ Importante: Si accedes al login desde local (file://), el middleware puede bloquear el acceso. Por eso, siempre usa la URL pública para iniciar sesión.

### 🖥️ Panel administrativo
Una vez iniciada la sesión correctamente, podrás acceder al panel administrativo donde puedes gestionar los eventos, contactos y suscripciones.

## 🧠 Middleware de protección
El sistema utiliza un middleware para proteger las rutas privadas. Solo si hay una sesión activa (sessionStorage.userActive), se permite el acceso a páginas administrativas.

## 🛠️ Archivos importantes
index.html: Página principal pública con eventos y formularios.

login.html: Página de inicio de sesión.

admin/: Carpeta con el panel de administración.

js/: Scripts de frontend.

eventos.js, contactos.js, suscripciones.js

login.js: Lógica de login.

middleware.js: Verificación de sesión.

db.json: Base de datos simulada para JSON Server.

## ✅ Requisitos
Navegador moderno.

Node.js y npm instalados (para usar JSON Server).

## 📬 Contacto

Desarrollado por
Samuel Quintero Sanchez
Andres Restrepo
Juan David Olaya
Cristian Chaverra 
Carlos 
clan:  Ritchie
Celula : themoodleboys.js
