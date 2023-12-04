const express = require("express");
const app = express();

const productsController = require("../controllers/productsController");

let router = express.Router();
//definimos las distintas rutas
router.get("/", productsController.index);
router.get("/login", productsController.login);
router.get("/carrito", productsController.carrito);
router.get("/detail", productsController.detail);
router.get("/register", productsController.register);
router.get("/admin", productsController.administracion);
router.get("/listado", productsController.listado);
router.get("/editar/:id", productsController.editar);
//Agrego la ruta para editar los productos
router.get("/:clubNombre", productsController.clubes);

module.exports = router;
