module.exports = (sequelize, dataTypes) => {
    let alias = 'Marcas';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        marca: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: 'marcas',
        timestamps: false
    };
    const Marcas = sequelize.define(alias, cols, config)

    return Marcas
}