'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PaymentMethod extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    PaymentMethod.init({

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        tipo: {
            type: Sequelize.STRING,
            allowNull: false,
        },

    }, {
        sequelize,
        modelName: 'PaymentMethod',
    });
    return PaymentMethod;
};