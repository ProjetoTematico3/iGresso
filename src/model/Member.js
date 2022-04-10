const Sequelize = require('sequelize');
const db = require('../database');

const Member = db.define('Member', {
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

    funcao: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Member;