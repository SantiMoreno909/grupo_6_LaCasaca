document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");
  let correo = document.querySelector("#email");
  let contrasena = document.querySelector("#contrasena");
  let errores = [];
  let erroresList = document.querySelector(".errores");

  form.addEventListener("submit", (event) => {
      
    errores = [];

    
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
      event.preventDefault();
      erroresList.innerHTML = ""; // Limpiar errores anteriores
      for (let error of errores) {
        erroresList.innerHTML += `<div class="error-card">${error}</div>`;
      }
    } else {
      erroresList.innerHTML = ""; // Limpiar errores anteriores si no hay errores nuevos
      fetch(form.action, {
        method: form.method,
        body: new FormData(form),
      })
        .then(response => response.json())
        .then(data => {
          // Manejar la respuesta del servidor si es necesario
          console.log(data);
        })
        .catch(error => {
          console.error("Error al enviar el formulario:", error);
        });
    }

      
    }
  )});
