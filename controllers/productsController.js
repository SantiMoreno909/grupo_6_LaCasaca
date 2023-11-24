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
    }
};

module.exports = controlador;
