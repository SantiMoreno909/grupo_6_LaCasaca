const db = require("../../database/models");

const productsControllerApi = {

    productos: (req, res) => {
        
        db.Productos.findAll().then(function (productos) {

            let countByCategory = {};
            let products = productos.map(producto => {
                //considera cetegory a los equipos 
                countByCategory[producto.equipoId] = (countByCategory[producto.equipoId] || 0) + 1;
    
                return {
                    id: producto.id,
                    name: producto.nombre,
                    description: producto.descripcion,
                    equipo: producto.equipoId, 
                    detail: `/api/productos/${producto.id}` 
                };
            });
          const response = {
            count: productos.length,
            countByCategory: countByCategory,
            productos: products
          }
          res.json(response);
        });
    },
    detail: (req, res) => {
        let productId = req.params.id;
        const productos = db.Productos.findByPk(productId).then(function (productos) {
          return res.json(productos);
        });
        //video 1:18
      }
}

module.exports = productsControllerApi;