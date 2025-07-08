document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
//aqui quemamos el usuario administrador que tendra acceso a el panel administrativo
const users = [
    {
        email : "admin123@correo.com",
        password : "admin123",
        rol : "admin"
    }
] 

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim().toLowerCase();

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        sessionStorage.setItem("userActive", JSON.stringify(user));
        location.href = "./admin/dashboard.html"
         
    } else {
      alert("Credenciales incorrectas");
    }
})
});
