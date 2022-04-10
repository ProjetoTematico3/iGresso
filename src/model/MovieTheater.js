const Sequelize = require('sequelize');
const db = require('../database');
const Adress = require('./Adress');

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
    foreignKey: "id_adress"
});

module.exports = MovieTheater;