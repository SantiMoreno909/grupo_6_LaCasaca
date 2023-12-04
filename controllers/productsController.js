const controlador = {
    index: (req,res) => {
        res.render('products/index');
    },
    login: (req,res) => {
        res.render('users/login');
    },
    carrito: (req,res) => {
        res.render('products/productCart');
    },
    detail: (req,res) => {
        res.render('products/productDetail');
    },
    register: (req,res) => {
        res.render('users/register');
    },
    administracion: (req,res) => {
        res.render('users/admin');
    },
    clubes: (req, res) => {
    let clubes = req.params.clubNombre;
    res.render("products/paginaClub", { clubes: clubes });
    },
    listado: (req, res) => {
        let listado= require('../data/product.json')
        res.render('products/productList', {listado: listado});
       
    }

};

module.exports = controlador;
