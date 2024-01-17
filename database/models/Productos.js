module.exports = (sequelize, dataTypes) => {
    let alias = 'Productos';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        precio: {
            type: dataTypes.FLOAT
        },
        talle: {
            type: dataTypes.STRING
        },
        descripcion:{
            type: dataTypes.STRING
        },
        equipoId:{
            type: dataTypes.INTEGER
        },
        ligaId:{
            type: dataTypes.INTEGER
        },
        stock:{
            type: dataTypes.INTEGER
        },
        marcaId:{
            type: dataTypes.INTEGER
        },
        url_foto:{
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: 'productos',
        timestamps: false
    };
    const Productos = sequelize.define(alias, cols, config)

    //un producto se relaciona con un equipo 
     Productos.associate= function(models){
         Productos.belongsTo(models.Equipos,{
            as: 'equipo',
            foreignkey: 'equipoId'

         });
    //     //si quiero agregar mas relaciones van aca 
          Productos.belongsTo(models.Marcas,{
              as: 'marca', //alias de la asociacion
             foreignkey: 'marcaId'
          });
     }
    return Productos
}