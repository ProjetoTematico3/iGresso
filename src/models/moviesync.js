const Sequelize = require('sequelize');
const db = require('../database');




'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MovieSync extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }
    MovieSync.init({

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        last_sync: {
            type: Sequelize.DATE,
            allowNull: false,
        },

    }, {
        sequelize,
        modelName: 'MovieSync',
    });
    return MovieSync;
};