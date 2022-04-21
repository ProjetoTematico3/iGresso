'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Movie extends Model {
        
    }
    Movie.init({
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
        api_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Movie',
    });
    return Movie;
};