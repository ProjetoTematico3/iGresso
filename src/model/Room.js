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
});

Room.hasMany(Schedule, {
    foreignKey: "id_sala"
});

Room.hasMany(Seat, {
    foreignKey: "id_sala"
});

module.exports = Room;