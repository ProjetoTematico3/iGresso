const Sequelize = require('sequelize');
const db = require('../database');
const Team = require('./Team');
const Image = require('./Image');

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

Movie.belongsTo(Team, {
    constraint: true,
    foreignKey: "id_time"
});

Movie.hasMany(Image, {
    foreignKey: "id_imagem"
});

module.exports = Movie;