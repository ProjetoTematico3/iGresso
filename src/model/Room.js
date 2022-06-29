const Sequelize = require('sequelize');
const db = require('../database');
const Schedule = require('./Schedule');
const Seat = require('./Seat');

const Room = db.define('Room', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    identificacao: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    assentos: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    colunas: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});


Room.hasMany(Seat, {
    foreignKey: "id_sala"
});



module.exports = Room;