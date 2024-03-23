module.exports = (sequelize, dataTypes) => {
  let alias = "Usuarios";
  let cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nombre: {
      type: dataTypes.STRING,
    },
    apellido: {
      type: dataTypes.STRING,
    },
    email: {
      type: dataTypes.STRING,
    },
    telefono: {
      type: dataTypes.STRING,
    },
    fec_nac: {
      type: dataTypes.DATE,
    },
    genero: {
      type: dataTypes.STRING,
    },
    url_foto_perfil: {
      type: dataTypes.STRING,
    },
    rol: {
      type: dataTypes.STRING,
    },
    contrasenia: {
      type: dataTypes.STRING,
    },
    confirmar_contrasenia: {
      type: dataTypes.STRING,
    },
  };
  let config = {
    tableName: "usuarios",
    timestamps: false,
  };
  const Usuarios = sequelize.define(alias, cols, config);

  return Usuarios;
};
