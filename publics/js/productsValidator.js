document.querySelector("load", () => {
  let nombre = document.getElementById("name");
  let precio = document.getElementById("precio");
  let team = document.getElementById("team");
  let talle = document.getElementById("talle");
  let descripcion = document.getElementById("descripcion");
  let liga = document.getElementById("liga");
  let stock = document.getElementById("stock");
  let marca = document.getElementById("marca");
  let categoria = document.getElementById("category");
  let foto = document.getElementById("foto");

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    let errores = [];
    let auxiliar = "";
    if (
      !nombre.value === "" ||
      !precio.value === "" ||
      !team.value === "" ||
      !talle.value === "" ||
      !descripcion.value === ""
    ) {
      errores.push("Todos los campos deben ser ingresados");
    } else {
      if (nombre.length < 5) {
        errores.push("El nombre debe tener al menos 5 caracteres");
      }
      if (descripcion.length < 20) {
        errores.push("La descripción debe tener al menos 20 caracteres");
      }
      if (
        !foto.value.toLowerCase().contains(".jpg") ||
        !foto.value.toLowerCase().contains(".jpeg") ||
        !foto.value.toLowerCase().contains(".png") ||
        !foto.value.toLowerCase().contains(".gif")
      ) {
        errores.push("El formato de imagen es invalido");
      }

      if (errores.length > 0) {
        for (let error of errores) {
          auxiliar += `<div class="error-card">${error}</div>`;
          document.querySelector(".errores").innerHTML = auxiliar;
        }
        return;
      }
    }
  });
});
