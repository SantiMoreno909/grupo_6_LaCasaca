const controlador = {
  index: (req, res) => {
    res.render("products/index");
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
  listado: (req, res) => {
    let listado = require("../data/product.json");
    res.render("products/productList", { listado: listado });
  },
  editar: (req, res) => {
    let listado = require("../data/product.json");
    let productId = req.params.id;
    res.render("products/productEdit", { listado: listado });
    //Extraigo el Id del URL, y le asigno la vista de edición y el objeto listado, para que pueda extraer de él los datos
    //Falta toda la lógica a esto, sigo medio perdido pero creo que va por ahí
  },
};

module.exports = controlador;
