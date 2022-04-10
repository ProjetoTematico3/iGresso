const Sequelize = require('sequelize');
const db = require('../database');

const Product = db.define('Product', {
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

    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },

    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

});

module.exports = Product;