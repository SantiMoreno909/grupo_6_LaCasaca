const fs = require("fs");
const path = require("path");
const productFilePath = path.join(__dirname, "../data/product.json");
const product = JSON.parse(fs.readFileSync(productFilePath, "utf-8"));

const db = require("../database/models");
const { Association } = require("sequelize");
const { validationResult } = require("express-validator");
const { promises } = require("stream");

const controlador = {
  index: async (req, res) => {
    //let productos = product;
    const productos = await db.Productos.findAll({
      include: [{ association: "equipo" }, { association: "marca" }],
      raw: true,
      nest: true,
    });

    res.render("products/index", { productos: productos });
  },

  login: (req, res) => {
    res.render("users/login");
  },

  carrito: (req, res) => {
    res.render("products/productCart");
  },

  detail: async (req, res) => {
    try {
      const productId = req.params.id; // Captura el param id
      const producto = await db.Productos.findByPk(productId, {
        include: [{ association: "equipo" }, { association: "marca" }],
      }); // Recupera el producto de la BDD

      if (!producto) {
        // Si no se encuentra el producto, renderizar una página de error o redirigir a otra página
        return res.render("error", { message: "Producto no encontrado" });
      }

      res.render(`products/productDetail`, { producto: producto }); // Renderizar la página de detalle del producto con el producto encontrado
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  register: (req, res) => {
    res.render("users/register");
  },

  administracion: (req, res) => {
    res.render("users/admin");
  },

  clubes: (req, res) => {
    let clubes = req.params.clubNombre;
    res.render("products/paginaClub", { clubes: clubes });
  },

  productos: (req, res) => {
    //let productos = product;
    //res.render("products/productList", { productos: productos });
    db.Productos.findAll({
      include: [{ association: "equipo" }, { association: "marca" }],
      raw: true,
      nest: true,
    }).then(function (productos) {
      res.render("products/productList", { productos: productos });
    });
  },

  crearProducto: async (req, res) => {
    try {
      const usuario = req.user;
      // Verificar si el usuario es administrador
      if (usuario && usuario.rol == "ADMIN") {
        // Asume que isAdmin es un campo en el modelo de usuario que indica si es administrador
        // Si el usuario es administrador, recuperar equipos, marcas y renderizar la página de creación de producto
        const equipos = await db.Equipos.findAll();
        const marcas = await db.Marcas.findAll();
        return res.render("products/productCreate", {
          equipos: equipos,
          marcas: marcas,
        });
      } else {
        // Si el usuario no es administrador, redirigirlo a la página de error
        return res.render("error", {
          message: "No tienes permiso para acceder a esta página.",
        });
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  guardarProducto: async function (req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const equipos = await db.Equipos.findAll();
        const marcas = await db.Marcas.findAll();
        return res.render("products/productCreate", {
          equipos: equipos,
          marcas: marcas,
          errors: errors.array(),
        });
      } else {
        const saveProd = await db.Productos.create({
          nombre: req.body.name,
          precio: req.body.precio,
          talle: req.body.talle,
          descripcion: req.body.description,
          equipoId: req.body.team,
          ligaId: req.body.liga,
          stock: req.body.stock,
          marcaId: req.body.marca,
          url_foto: req.body.foto,
        });
        saveProd.save();
        res.redirect("/productos");
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  editar: async (req, res) => {
    try {
      const productId = req.params.id;
      const productos = await db.Productos.findByPk(productId);
      const equipos = await db.Equipos.findAll();
      const marcas = await db.Marcas.findAll();

      res.render("products/productEdit", {
        productos: productos,
        equipos: equipos,
        marcas: marcas,
      });
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  update: async (req, res) => {
    try {
      await db.Productos.update(
        {
          nombre: req.body.name,
          precio: req.body.precio,
          talle: req.body.talle,
          descripcion: req.body.description,
          equipoId: req.body.team,
          ligaId: req.body.liga,
          stock: req.body.stock,
          marcaId: req.body.marca,
          url_foto: req.body.foto,
        },
        { where: { id: req.params.id } }
      );
      res.redirect("/productos");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  destroy: async (req, res) => {
    try {
      await db.Productos.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.redirect("/productos");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
};

module.exports = controlador;
