const fs = require("fs");
const path = require("path");
const productFilePath = path.join(__dirname, "../data/product.json");
const product = JSON.parse(fs.readFileSync(productFilePath, "utf-8"));

const db = require("../database/models");
const { Association } = require("sequelize");
const { validationResult } = require("express-validator");
const { promises } = require("stream");

const controlador = {
  index: async(req, res) => {
    //let productos = product;
    const productos =  await db.Productos.findAll(
      {
        include: [{ association: "equipo" }, { association: "marca" }],
        raw: true,
        nest: true
      });
     
    res.render("products/index", { productos: productos });
  },

  login: (req, res) => {
    res.render("users/login");
  },

  carrito: (req, res) => {
    res.render("products/productCart");
  },

  detail: (req, res) => {
    res.render("products/productDetail");
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
    const equipos = await db.Equipos.findAll();
    const marcas = await db.Marcas.findAll();
    return res.render("products/productCreate", {
      equipos: equipos,
      marcas: marcas,
    });
  },

  guardarProducto: async function (req, res) {
    console.log(req);
    try {
      // Validar los resultados de la validación
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        // Si hay errores, obtener equipos y marcas y renderizar nuevamente el formulario con los errores

        const equipos = await db.Equipos.findAll();
        const marcas = await db.Marcas.findAll();
        // return res.render("products/productCreate", {
        //   equipos: equipos,
        //   marcas: marcas,
        //   errors: errors.array(),
        // });
      }else{
        console.log("entra el producto guardar");
      }
      
      // Si no hay errores, continuar con la lógica para guardar el producto
      const saveProd= await db.Productos.create({
        /* Campos del producto */
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
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  editar: (req, res) => {
    let productId = req.params.id;
    // const result = product.find((data) => {
    //   return data.id == productId;
    // });

    // res.render("products/productEdit", { producto: result });
    /*db.Productos.findByPk(productId).then(
      function (productos) {
        return res.render("products/productEdit", { productos: productos });
      }
    );*/
    const productos = db.Productos.findByPk(productId);
    const equipos = db.Equipos.findAll();
    const marcas = db.Marcas.findAll();

    Promise.all([productos, equipos, marcas]).then(function ([
      productos,
      equipos,
      marcas,
    ]) {
      return res.render("products/productEdit", {
        productos: productos,
        equipos: equipos,
        marcas: marcas,
      });
    });
  },

  update: (req, res) => {
    // const {
    //   name,
    //   description,
    //   category,
    //   liga,
    //   team,
    //   talle,
    //   precio,
    //   marca,
    //   stock,
    // } = req.body;
    // const id = parseInt(req.params.id);
    // const index = product.findIndex((prod) => prod.id === id);

    // if (index === -1) {
    //   res.render("productos");
    //   return;
    // }

    // product[index].name = name;
    // product[index].description = description;
    // product[index].category = category;
    // product[index].liga = liga;
    // product[index].team = team;
    // product[index].talle = talle;
    // product[index].precio = precio;
    // product[index].marca = marca;
    // product[index].stock = stock;

    // fs.writeFileSync(productFilePath, JSON.stringify(product), "utf-8");
    // res.redirect("/productos");
    db.Productos.update(
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
  },

  destroy: (req, res) => {
    // const { id } = req.params;
    // const productIndex = product.findIndex((prod) => prod.id === parseInt(id));
    // product.splice(productIndex, 1);
    // fs.writeFileSync(productFilePath, JSON.stringify(product), "utf-8");
    db.Productos.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/productos");
  },
};

module.exports = controlador;
