const Sequelize = require('sequelize');
const db = require('../database');
const Movie = require('./Movie');

const Schedule = db.define('Schedule', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    data: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },

    horario: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    idioma: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    tipo_agendamento: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }
});

Schedule.belongsTo(Movie, {
    constraint: true,
    foreignKey: "id_filme"
});


module.exports = Schedule;