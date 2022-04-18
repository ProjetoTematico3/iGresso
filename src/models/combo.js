'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Combo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Combo.hasMany(models.Product, {
                constraints: true,
                foreignKey: "id_combo",
                onDelete: true,
                onUpdate: true
            });
        }
    }
    Combo.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        descricao: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        preco: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Combo',
    });
    return Combo;
};