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
        stock:{
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

    return Productos
}