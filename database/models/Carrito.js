module.exports = (sequelize, dataTypes) => {
    let alias = 'Carrito';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cantidad: {
            type: dataTypes.INTEGER
        },
        talle:{
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: 'carrito',
        timestamps: false
    };
    const Carrito = sequelize.define(alias, cols, config)

    return Carrito
}