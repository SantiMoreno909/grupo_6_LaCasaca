module.exports = (sequelize, dataTypes) => {
    let alias = 'Marcas';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: 'marcas',
        timestamps: false
    };
    const Marcas = sequelize.define(alias, cols, config)

      Marcas.associate= function(models){
          Marcas.hasMany(models.Productos,{
              as: 'marca',
              foreignkey: 'marcaId'

          })
      }
    return Marcas
}