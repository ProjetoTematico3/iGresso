const Sequelize = require('sequelize');
const db = require('../database');
const Team = require('./Team');
const Image = require('./Image');
const Review = require('./Review');
const Schedule = require('./Schedule');

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
        type: Sequelize.STRING(65535),
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

    classificacao: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    api_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
});

/*Movie.belongsTo(Team, {
    constraint: true,
    foreignKey: "id_filme"
});*/

Movie.belongsTo(Team, {
    constraint: true,
    foreignKey: "id_time"
});

Movie.hasMany(Image, {
    foreignKey: "id_filme"
});

Movie.hasMany(Review, {
    foreignKey: "id_filme"
});

Movie.hasMany(Schedule, {
    foreignKey: "id_filme"
});

Schedule.belongsTo(Movie, {
    foreignKey: "id_filme"
});


module.exports = Movie;