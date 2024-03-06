const db = require("../../database/models");

const productsControllerApi = {
  productos: (req, res) => {
    db.Productos.findAll({
      include: [
        { association: "equipo" },
        { association: "marca" },
        { association: "categorias" },
      ],
    }).then(function (productos) {
      let countByCategory = {};
      let products = productos.map((producto) => {
        // Considera category a las categorías
        producto.categorias.forEach((categoria) => {
          countByCategory[categoria.nombre] =
            (countByCategory[categoria.nombre] || 0) + 1;
        });

        return {
          id: producto.id,
          name: producto.nombre,
          description: producto.descripcion,
          equipoId: producto.equipoId,
          equipo: producto.equipo.nombre,
          categories: producto.categorias.map((categoria) => categoria.nombre),
          detail: `/api/products/${producto.id}`,
        };
      });

      const response = {
        count: productos.length,
        countByCategory: countByCategory,
        productos: products, // Modificado de "products" a "productos" para mantener la nomenclatura en español
      };
      res.json(response);
    });
  },
  detail: (req, res) => {
    let productId = req.params.id;
    db.Productos.findByPk(productId, {
      include: [
        { association: "categorias" },
        { association: "colores" },
        { association: "tallas" },
      ],
    }).then(function (producto) {
      const response = {
        id: producto.id,
        name: producto.nombre,
        description: producto.descripcion,
        categories: producto.categorias.map((categoria) => categoria.nombre),
        colors: producto.colores.map((color) => color.nombre),
        sizes: producto.tallas.map((talla) => talla.nombre),
        imageURL: producto.imagenURL,
      };
      res.json(response);
    });
  },
};

module.exports = productsControllerApi;
