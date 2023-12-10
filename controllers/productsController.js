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
    //let listado = product;
    let productId = req.params.id;
    const result = product.find((data)=>{
      if(data.id == productId){
        return data;
      }
    })

    console.log(result);
    
    res.render("products/productEdit", { listado: result});
    
  },
  update: (req, res) => {
    const { name,description,category,liga,team,talle,precio,marca,stock}= req.body;
    const id = parseInt(req.params.id);
    const index = product.findIndex(prod=>prod.id ===id);

    if(index === -1) {
      res.render('listado');
      return
    }
    
    product[index].name = name;
    product[index].description = description;
    product[index].category = category;
    product[index].liga = liga;
    product[index].team = team;
    product[index].talle = talle;
    product[index].precio = precio;
    product[index].marca = marca;
    product[index].stock = stock;

    fs.writeFileSync(productFilePath, JSON.stringify(product), 'utf-8');
    res.redirect("/listado");
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
