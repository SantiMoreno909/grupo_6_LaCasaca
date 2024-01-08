const express = require("express");
const app = express();
const path = require("path");

const usersController = require("../controllers/usersController");
const multer = require("multer");
const bcrypt = require("bcryptjs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../publics/img/users")); //donde guardar
  },
  filename: (req, file, cb) => {
    console.log("valor id", req.params.id);
    const newFilename = "user-" + Date.now() + path.extname(file.originalname);
    cb(null, newFilename); //nombre para guardar
  },
});

const upload = multer({ storage });

let router = express.Router();
//definimos las distintas rutas
router.get("/usuarios", usersController.usuarios);
/*para el create*/
router.get("/register", usersController.register);
router.post(
  "/guardarUser",
  upload.single("fotoPerfil"),
  usersController.guardarUsuario
);

/*para eliminar*/
router.delete("/delete/:id", usersController.destroy);

/*para editar*/
router.get("/editar/:id", usersController.editar);
router.put("/editar/:id", upload.single("fotoPerfil"), usersController.update);

// Nueva ruta para el inicio de sesión
router.get("/login", usersController.login);
router.post("/login", usersController.iniciarSesion);

// Ruta para cerrar sesión
router.get("/logout", usersController.cerrarSesion);
module.exports = router;
