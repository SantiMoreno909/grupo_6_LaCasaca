const fs = require('fs');
const path = require('path');
const productFilePath = path.join(__dirname, '../data/product.json');
const product= JSON.parse(fs.readFileSync(productFilePath, 'utf-8'));

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
    let listado = product;
    res.render("products/productList", { listado: listado });
  },
  crearProducto: (req, res) => {
    res.render("products/productCreate");
  },
  guardarProducto: (req,res) => {
    product.push(req.body)
    console.log("Product nuevo", product);
    fs.writeFileSync(productFilePath, JSON.stringify(product), 'utf-8');
    //res.send(req.body)
    res.redirect("/listado");
  },
  editar: (req, res) => {
    let listado = product;
    let productId = req.params.id;
    res.render("products/productEdit", { listado: listado });
    //Extraigo el Id del URL, y le asigno la vista de edición y el objeto listado, para que pueda extraer de él los datos
    //Falta toda la lógica a esto, sigo medio perdido pero creo que va por ahí
  },
  
};

module.exports = controlador;
