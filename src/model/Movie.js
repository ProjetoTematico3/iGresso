const Sequelize = require('sequelize');
const db = require('../database');

const Movie = db.define('Movie', {
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

    descricao: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    dt_lancamento: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    duracao: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = Movie;