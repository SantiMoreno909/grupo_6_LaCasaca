const { Usuarios } = require("../../database/models/Usuarios"); // Importa el modelo de usuario

const verificarAdmin = async (req, res, next) => {
  try {
    // Verificar si hay un usuario autenticado
    if (!req.user) {
      // Si no hay usuario autenticado, redirigir a la página de inicio de sesión o mostrar un mensaje de error
      return res.render("error", {
        message: "Debes iniciar sesión para acceder a esta página.",
      });
    }

    // Obtener el nombre de usuario del usuario autenticado
    const nombreUsuario = req.user.username;

    // Buscar el usuario en la base de datos por su nombre de usuario
    const usuario = await db.Usuarios.findOne({
      where: { nombre: nombreUsuario },
    });

    // Verificar si se encontró el usuario y si es un administrador
    if (usuario && usuario.rol === "ADMIN") {
      // Si el usuario es administrador, permite el acceso a la ruta solicitada
      next(); // Llama a la siguiente función de middleware o al controlador
    } else {
      // Si el usuario no es administrador, redirigir a la página de error
      return res.render("error", {
        message: "No tienes permiso para acceder a esta página.",
      });
    }
  } catch (error) {
    console.error("Error al verificar el rol del usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = verificarAdmin;
