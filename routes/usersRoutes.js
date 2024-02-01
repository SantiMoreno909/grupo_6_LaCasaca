const express = require("express");
const router = express.Router();
const path = require("path");
const { body, validationResult } = require("express-validator");
const { Usuarios } = require("../database/models");
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
  body("Nombre")
    .bail()
    .notEmpty()
    .withMessage("Debes completar el nombre")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres"),

  body("Apellido")
    .bail()
    .notEmpty()
    .withMessage("Debes completar el apellido")
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener al menos 2 caracteres"),

  body("email")
    .bail()
    .isEmail()
    .withMessage("Debes completar un email válido")
    .custom(async (value, { req }) => {
      const existingUser = await Usuarios.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),

  body("tel").bail().notEmpty().withMessage("Debes completar el teléfono"),

  body("nacimiento")
    .bail()
    .notEmpty()
    .withMessage("Debes completar la fecha de nacimiento"),

  body("genero").bail().notEmpty().withMessage("Debes completar el género"),

  body("contrasena")
    .bail()
    .notEmpty()
    .withMessage("Debes completar la contraseña")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .optional()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "La contraseña debe tener letras mayúsculas, minúsculas, un número y un carácter especial"
    ),

  body("repetir_contrasena")
    .bail()
    .notEmpty()
    .withMessage("Debes completar la contraseña repetida"),

  body("fotoPerfil")
    .bail()
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Debes subir una imagen");
      }
      const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
      const ext = path
        .extname(req.file.originalname)
        .toLowerCase()
        .substring(1);
      if (!allowedExtensions.includes(ext)) {
        throw new Error("La imagen debe tener formato JPG, JPEG, PNG o GIF");
      }
      return true;
    }),
];

const validateLogin = [
  body("email").isEmail().withMessage("Debes proporcionar un email válido"),
  body("contrasena")
    .notEmpty()
    .withMessage("Debes proporcionar la contraseña"),
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
  async (req, res) => {
    try {
      // Validar los resultados de la validación
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // Si hay errores, renderizar nuevamente la página de registro con los mensajes de error
        return res.render("users/register", { errors: errors.array() });
      }

      // Si no hay errores y se ha cargado un archivo, continuar con la lógica para guardar el usuario
      await Usuarios.create({
        nombre: req.body.Nombre,
        apellido: req.body.Apellido,
        email: req.body.email,
        telefono: req.body.tel,
        fec_nac: req.body.nacimiento,
        genero: req.body.genero,
        url_foto_perfil: req.file.filename, // Asumiendo que el nombre de la imagen se guarda en el modelo
      });

      // Lógica para redirigir o enviar respuesta
      res.send("Usuario registrado exitosamente");
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
      // Lógica para manejar el error
      res.status(500).send("Error interno del servidor");
    }
  }
);

// Ruta para eliminar un usuario
router.delete("/delete/:id", usersController.destroy);

// Ruta para editar un usuario
router.get("/editar/:id", usersController.editar);
router.put("/editar/:id", upload.single("fotoPerfil"), usersController.update);

// Ruta para el inicio de sesión
router.get("/login", usersController.login);
router.post(
  "/login",
  validateLogin,
  usersController.iniciarSesion
);

// Ruta para cerrar sesión
router.get("/logout", usersController.cerrarSesion);

module.exports = router;
