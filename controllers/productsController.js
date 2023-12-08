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
    fs.writeFileSync(productFilePath, JSON.stringify(product), 'utf-8');
    res.redirect("/listado");
  },
  editar: (req, res) => {
    let listado = product;
    let productId = req.params.id;
    res.render("products/productEdit", { listado: listado });
    
  },
  destroy: (req,res) => {
    const {id}= req.params;
    const productIndex= product.findIndex(product=>product.id=== parseInt(id));
    product.splice(productIndex,1)
    fs.writeFileSync(productFilePath, JSON.stringify(product), 'utf-8');
    res.redirect("/listado");
  }
  
};

module.exports = controlador;
