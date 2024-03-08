const db = require("../../database/models");

const usersControllerApi = {
  usuarios: (req, res) => {
    db.Usuarios.findAll({
      raw: true,
      nest: true,
    }).then(function (usuarios) {
      let countByCategory = {};
      let users = usuarios.map((usuarios) => {
        //considera cetegory a los equipos
        countByCategory[usuarios.nombre] =
          (countByCategory[usuarios.nombre] || 0) + 1;

        return {
          id: usuarios.id,
          name: usuarios.nombre + usuarios.apellido,
          email: usuarios.email,
          telefono: usuarios.telefono,
          nacimiento: usuarios.fec_nac,
          genero: usuarios.genero,
          direccion: usuarios.direccion_envios,
          detail: `/api/usuarios/${usuarios.id}`,
        };
      });
      const response = {
        count: usuarios.length,
        countByCategory: countByCategory,
        productos: users,
      };
      res.json(response);
    });
  },
  detalleUsuarios: (req, res) => {
    let userId = req.params.id;
    const usuarios = db.Usuarios.findByPk(userId).then(function (usuarios) {
      return res.json(usuarios);
    });
    //video 1:18
  },
};

module.exports = usersControllerApi;
