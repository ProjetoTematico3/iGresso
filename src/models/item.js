'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Item.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        valor: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },

        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Item',
    });
    return Item;
};