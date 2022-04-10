const Sequelize = require('sequelize');
const db = require('../database');

const Schedule = db.define('Schedule', {
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
});

module.exports = Schedule;