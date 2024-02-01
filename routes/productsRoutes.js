const express = require("express");
const router = express.Router();
const path = require("path");
const { body, validationResult } = require("express-validator");
const productsController = require("../controllers/productsController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../publics/img/products"));
  },
  filename: (req, file, cb) => {
    const newFilename =
      "product-" + Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

// Validaciones
const validateCreateForms = [
  body("name")
    .notEmpty()
    .withMessage("Debes completar el nombre")
    .isLength({ min: 5 })
    .withMessage("El nombre debe tener al menos 5 caracteres"),

  body("description")
    .notEmpty()
    .withMessage("Debes completar la descripción")
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),

  body("team").notEmpty().withMessage("Debes seleccionar un equipo"),

  body("liga").notEmpty().withMessage("Debes seleccionar una liga"),

  body("marca").notEmpty().withMessage("Debes seleccionar una marca"),

  body("precio").notEmpty().withMessage("Debes completar el precio"),

  body("talle").notEmpty().withMessage("Debes completar el talle"),

  body("stock").notEmpty().withMessage("Debes completar el stock"),

  body("fotoPerfil").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Debes subir una imagen");
    }
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const ext = path.extname(req.file.originalname).toLowerCase().substring(1);
    if (!allowedExtensions.includes(ext)) {
      throw new Error("La imagen debe tener formato JPG, JPEG, PNG o GIF");
    }
    return true;
  }),
];

//definimos las distintas rutas
router.get("/", productsController.index);

router.get("/login", productsController.login);
router.get("/carrito", productsController.carrito);
router.get("/detail", productsController.detail);
router.get("/register", productsController.register);
router.get("/admin", productsController.administracion);

router.get("/productos", productsController.productos);
/*para el create*/
router.get("/crearProducto", productsController.crearProducto);
router.post(
  "/guardar",
  upload.single("fotoPerfil"),
  validateCreateForms,
  productsController.guardarProducto
);
/*para editar*/
router.get("/editar/:id", productsController.editar);
router.put("/editar/:id", productsController.update);

/*para eliminar*/
router.delete("/delete/:id", productsController.destroy);

//Agrego la ruta para editar los productos
router.get("/:clubNombre", productsController.clubes);

module.exports = router;
