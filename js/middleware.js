document.addEventListener("DOMContentLoaded", () => {
  const userActive = sessionStorage.getItem("userActive");
  const isLoginPage = location.pathname.endsWith("login.html");

  if (!userActive && !isLoginPage) {
    alert("Debes iniciar sesión para acceder a esta página.");
    location.href = "../login.html";
  }
});
