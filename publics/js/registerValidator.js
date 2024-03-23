window.addEventListener("DOMContentLoaded", () => {
  console.log("Conectado");
  let nombre = document.getElementById("nombre");
  let apellido = document.getElementById("apellido");
  let email = document.getElementById("email");
  let telefono = document.getElementById("tel");
  let fec_nac = document.getElementById("nacimiento");
  let genero = document.getElementById("genero");
  let fotoPerfil = document.getElementById("fotoPerfil");
  let contrasenia = document.getElementById("contrasenia");
  let repContrasenia = document.getElementById("confirmar_contrasenia");
  let terminos = document.getElementById("aceptar_terminos");
  let newsletter = document.getElementById("newsletter");
  let errores = [];
  let auxiliar = "";

  document.querySelector("form").addEventListener("submit", function (event) {
    

    // Limpiar errores anteriores
    document.querySelector(".errores").innerHTML = "";
    errores = [];

    // Validación del campo "Nombre"
    if (nombre.value === "") {
      errores.push('El campo "Nombre" no puede estar vacío');
    } else if (nombre.value.length < 2) {
      errores.push('El campo "Nombre" debe tener al menos 2 caracteres');
    }

    // Validación del campo "Apellido"
    if (apellido.value === "") {
      errores.push('El campo "Apellido" no puede estar vacío');
    } else if (apellido.value.length < 2) {
      errores.push('El campo "Apellido" debe tener al menos 2 caracteres');
    }

    // Validación del campo "Email"
    if (email.value === "") {
      errores.push('El campo "Email" no puede estar vacío');
    } else if (!email.value.includes("@") || !email.value.includes(".")) {
      errores.push('El campo "Email" no es válido');
    }

    // Validación del campo "Contraseña"
    if (contrasenia.value === "") {
      errores.push('El campo "Contraseña" no puede estar vacío');
    } else if (contrasenia.value.length < 8) {
      errores.push("La contraseña debe tener al menos 8 caracteres");
    }

    // Validación del campo "Foto de perfil"
    if (
      !fotoPerfil.value.toLowerCase().includes(".jpg") &&
      !fotoPerfil.value.toLowerCase().includes(".jpeg") &&
      !fotoPerfil.value.toLowerCase().includes(".png") &&
      !fotoPerfil.value.toLowerCase().includes(".gif")
    ) {
      errores.push("El formato de imagen es inválido");
    }

    // Mostrar errores
    if( errores.length > 0 ) {
      event.preventDefault();
   
        for (let error of errores) {
          auxiliar += `<div class="error-card">${error}</div>`;
        }
      
        document.querySelector(".errores").innerHTML = auxiliar;
    }
  });
});

window.onload = function () {
  setInterval(() => {
    let registrado = document.getElementById("createok")
    if(registrado) {
      window.location= "/login";
    }

  }, 2000);
};
