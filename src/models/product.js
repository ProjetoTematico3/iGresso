'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Product.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        preco: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },

        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};