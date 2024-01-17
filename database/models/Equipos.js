module.exports = (sequelize, dataTypes) => {
    let alias = 'Equipos';
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
        tableName: 'equipos',
        timestamps: false
    };
    const Equipos = sequelize.define(alias, cols, config)

     Equipos.associate= function(models){
         Equipos.hasMany(models.Productos,{
             as: 'equipo',
             foreignkey: 'equipoId'

         })
     }
    return Equipos
}