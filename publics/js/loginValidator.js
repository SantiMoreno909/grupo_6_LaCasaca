document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let correo = document.querySelector("#email");
    let contrasena = document.querySelector("#contrasena");
    let errores = [];
    let erroresList = document.querySelector(".errores");

    // Validación del campo de correo
    if (correo.value === "") {
      errores.push('El campo "Email" no puede estar vacío');
    } else if (!correo.value.includes("@") || !correo.value.includes(".")) {
      errores.push('El campo "Email" no es válido');
    }

    // Validación del campo de contraseña
    if (contrasena.value === "") {
      errores.push('El campo "Contraseña" no puede estar vacío');
    } else if (contrasena.value.length < 8) {
      errores.push("La contraseña debe tener al menos 8 caracteres");
    }

    // Mostrar errores en la lista de errores
    if (errores.length > 0) {
      erroresList.innerHTML = ""; // Limpiar errores anteriores
      for (let error of errores) {
        erroresList.innerHTML += `<li class="error-card">${error}</li>`;
      }
    } else {
      erroresList.innerHTML = ""; // Limpiar errores anteriores si no hay errores nuevos
    }
  });
});
