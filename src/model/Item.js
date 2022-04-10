const Sequelize = require('sequelize');
const db = require('../database');

const Item = db.define('Item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },

    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = Item;