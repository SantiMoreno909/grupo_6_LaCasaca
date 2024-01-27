window.addEventListener("", () => {
  let nombre = document.getElementById("nombre");
  let apellido = document.getElementById("apellido");
  let email = document.getElementById("email");
  let telefono = document.getElementById("tel");
  let fec_nac = document.getElementById("nacimiento");
  let genero = document.getElementById("genero");
  let fotoPerfil = document.getElementById("fotoPerfil");
  let contrasenia = document.getElementById("contrasenia");
  let repContrasenia = document.getElementById("repetir_contrasena");
  let terminos = document.getElementById("aceptar_terminos");
  let newsletter = document.getElementById("newsletter");

  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    let errores = [];
    let auxiliar = "";

    nombre.addEventListener("change", (e) => {
      if (e.value === "") {
        errores.push('El campo "Nombre" no puede estar vacío');
      } else if (e.length < 2) {
        errores.push('El campo "Nombre" debe tener al menos 2 caracteres');
      }
    });

    apellido.addEventListener("change", (e) => {
      if (e.value === "") {
        errores.push('El campo "Apellido" no puede estar vacío');
      } else if (e.length < 2) {
        errores.push('El campo "Apellido" debe tener al menos 2 caracteres');
      }
    });

    email.addEventListener("change", (e) => {
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

    fotoPerfil.addEventListener("change", (e) => {
      if (
        !e.value.toLowerCase().contains(".jpg") ||
        !e.value.toLowerCase().contains(".jpeg") ||
        !e.value.toLowerCase().contains(".png") ||
        !e.value.toLowerCase().contains(".gif")
      ) {
        errores.push("El formato de imagen es invalido");
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
