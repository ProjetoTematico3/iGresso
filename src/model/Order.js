const Sequelize = require('sequelize');
const db = require('../database');
const PaymentMethod = require('./PaymentMethod');
const Item = require('./Item');
const Schedule = require('./Schedule');
const Movie = require('./Movie');
const Order = db.define('Order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    dt_cadastro: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
    },

    id_usuario:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    id_filme:{
        type: Sequelize.INTEGER,
    },

    id_schedule:{
        type: Sequelize.INTEGER,
    },

    status:{
        type: Sequelize.INTEGER // 0- ok, 1 cancelado
    }

});

Order.belongsTo(PaymentMethod, {
    constraint: true,
    foreignKey: 'id_metodo_pagamento'
});


Order.hasMany(Item, {
    foreignKey: 'id_pedido'
});











module.exports = Order;