const Sequelize = require('sequelize');
const db = require('../database');
const Movie = require('./Movie');

const Gender = db.define('Gender', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

Gender.hasMany(Movie, {
    foreignKey: 'id_filme'
});

module.exports = Gender;