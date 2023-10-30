document.querySelector('form').addEventListener('submit', function(event) {
    var contrasena = document.getElementById('contrasena').value;
    var repetirContrasena = document.getElementById('repetir_contrasena').value;

    if (contrasena !== repetirContrasena) {
        alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
        event.preventDefault();
    }
});

