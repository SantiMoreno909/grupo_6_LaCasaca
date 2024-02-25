document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");
  let nombre = document.getElementById("name");
  let precio = document.getElementById("precio");
  let team = document.getElementById("team");
  let talle = document.getElementById("talle");
  let descripcion = document.getElementById("description");
  let liga = document.getElementById("liga");
  let stock = document.getElementById("stock");
  let marca = document.getElementById("marca");
  let categoria = document.getElementById("category");
  let foto = document.getElementById("foto");
  let erroresList = document.querySelector(".errores");

  form.addEventListener("submit", (e) => {
    
    let errores = [];
    let auxiliar = "";

    if (
      nombre.value === "" ||
      precio.value === "" ||
      team.value === "" ||
      talle.value === "" ||
      descripcion.value === ""
    ) {
      errores.push("Todos los campos deben ser ingresados");
    } else {
      if (nombre.value.length < 5) {
        errores.push("El nombre debe tener al menos 5 caracteres");
      }
      if (descripcion.value.length < 8) {
        errores.push("La descripción debe tener al menos 8 caracteres");
      }
      if (
        !foto.value.toLowerCase().includes(".jpg") &&
        !foto.value.toLowerCase().includes(".jpeg") &&
        !foto.value.toLowerCase().includes(".png") &&
        !foto.value.toLowerCase().includes(".gif")
      ) {
        errores.push("El formato de imagen es inválido");
      }
    }

    // Mostrar errores en la lista de errores
    if (errores.length > 0) {
      e.preventDefault();
      erroresList.innerHTML = ""; // Limpiar errores anteriores
      for (let error of errores) {
        auxiliar += `<div class="error-card">${error}</div>`;
      }
      erroresList.innerHTML = auxiliar;
    } else {
      erroresList.innerHTML = ""; // Limpiar errores anteriores si no hay errores nuevos
    }
  });
});
