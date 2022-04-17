'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Adress extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }
    Adress.init({

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        bairro: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        numero: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        cidade: {
            type: Sequelize.STRING,
            allowNull: false,
        }

    }, {
        sequelize,
        modelName: 'Adress',
    });
    return Adress;
};