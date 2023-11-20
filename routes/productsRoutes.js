
const express = require("express");
const app = express();

const productsController = require("../controllers/productsController");

let router= express.Router();
//definimos las distintas rutas
router.get('/',productsController.index)
router.get('/login',productsController.login)
router.get('/carrito',productsController.carrito)
router.get('/detail',productsController.detail)
router.get('/register',productsController.register)

module.exports = router;
