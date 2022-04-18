'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Schedule.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        dia: {
            type: Sequelize.DATE,
            allowNull: false,
        },

        horario: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },

        idioma: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};