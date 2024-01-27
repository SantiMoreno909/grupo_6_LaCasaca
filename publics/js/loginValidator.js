document.addEventListener("load", () => {
  let correo = document.querySelector("#email");
  let contrasena = document.querySelector("#contrasena");

  document.querySelector("form").addEventListener("submit", () => {
    correo.addEventListener("change", (e) => {
      if (e.value === "") {
        errores.push('El campo "Email" no puede estar vacío');
      } else if (!e.value.includes("@") && !e.value.includes(".")) {
        errores.push('El campo "Email" no es valido');
      }
    });

    contrasenia.addEventListener("change", (e) => {
      if (e.value === "") {
        errores.push('El campo "Contraseña" no puede estar vacío');
      } else if (e.length < 8) {
        errores.push("La contraseña debe tener al menos 8 caracteres");
      }
    });

    if (errores.length > 0) {
      for (let error of errores) {
        auxiliar += `<div class="error-card">${error}</div>`;
        document.querySelector(".errores").innerHTML = auxiliar;
      }
      return;
    }
  });
});
