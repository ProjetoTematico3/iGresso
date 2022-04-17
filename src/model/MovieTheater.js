const Sequelize = require('sequelize');
const db = require('../database');
const Adress = require('./Adress');
const Room = require('./Room');
const User = require('./User');
const Ingress = require('./Ingress');

const MovieTheater = db.define('MovieTheater', {
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

})

MovieTheater.belongsTo(Adress, {
    constraint: true,
    foreignKey: "id_endereco"
});

MovieTheater.hasMany(Room, {
    foreignKey: "id_cinema"
});

MovieTheater.hasMany(User, {
    foreignKey: "id_cinema"
});

MovieTheater.hasMany(Ingress, {
    foreignKey: "id_cinema"
});

module.exports = MovieTheater;