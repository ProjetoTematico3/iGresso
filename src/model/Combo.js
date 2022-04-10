const Sequelize = require('sequelize');
const db = require('../database');
const Product = require('./Product');

const Combo = db.define('Combo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },

});

Combo.hasMany(Product, {
    foreignKey: "id_produto"
});

module.exports = Combo;