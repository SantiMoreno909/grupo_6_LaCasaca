module.exports = (sequelize, dataTypes) => {
    let alias = 'Ventas';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cobrado: {
            type: dataTypes.BOOLEAN
        },
        enviado:{
            type: dataTypes.BOOLEAN
        },
        entregado:{
            type: dataTypes.BOOLEAN
        }
    }
    let config = {
        tableName: 'ventas',
        timestamps: false
    };
    const Ventas = sequelize.define(alias, cols, config)

    return Ventas
}