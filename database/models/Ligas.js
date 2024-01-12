module.exports = (sequelize, dataTypes) => {
    let alias = 'Ligas';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        pais:{
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: 'ligas',
        timestamps: false
    };
    const Ligas = sequelize.define(alias, cols, config)

    return Ligas
}