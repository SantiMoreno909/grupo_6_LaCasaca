const express = require("express");
const router = express.Router();
const path = require("path");
const { body, validationResult } = require("express-validator");

const usersController = require("../controllers/usersController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../publics/img/users"));
  },
  filename: (req, file, cb) => {
    const newFilename = "user-" + Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

// Validaciones
const validateCreateForms = [
  body("Nombre").notEmpty().withMessage("Debes completar el nombre"),
  body("Apellido").notEmpty().withMessage("Debes completar el apellido"),
  body("email").isEmail().withMessage("Debes completar un email válido"),
  body("tel").notEmpty().withMessage("Debes completar el teléfono"),
  body("nacimiento").notEmpty().withMessage("Debes completar la fecha de nacimiento"),
  body("genero").notEmpty().withMessage("Debes completar el género"),
  body("fotoPerfil").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Debes subir una imagen");
    }
    return true;
  }),
  body("contrasena").notEmpty().withMessage("Debes completar la contraseña"),
  body("repetir_contrasena").notEmpty().withMessage("Debes completar la contraseña repetida"),
];

// Definimos las distintas rutas
router.get("/usuarios", usersController.usuarios);

// Ruta para el formulario de registro
router.get("/register", usersController.register);

// Ruta para procesar el formulario de registro
router.post(
  "/guardarUser",
  upload.single("fotoPerfil"),
  validateCreateForms,
  (req, res) => {
    // Validar los resultados de la validación
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Si hay errores, renderizar nuevamente la página de registro con los mensajes de error
      return res.render("users/register", { errors: errors.array() });
    }

    // Si no hay errores y se ha cargado un archivo, continuar con la lógica para guardar el usuario
    usersController.guardarUsuario(req, res);
  }
);

// Ruta para eliminar un usuario
router.delete("/delete/:id", usersController.destroy);

// Ruta para editar un usuario
router.get("/editar/:id", usersController.editar);
router.put("/editar/:id", upload.single("fotoPerfil"), usersController.update);

// Ruta para el inicio de sesión
router.get("/login", usersController.login);
router.post("/login", usersController.iniciarSesion);

// Ruta para cerrar sesión
router.get("/logout", usersController.cerrarSesion);

module.exports = router;
