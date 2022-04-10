const Sequelize = require('sequelize');
const db = require('../database');

const Adress = db.define('Adress', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    cidade: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Adress;