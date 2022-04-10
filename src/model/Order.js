const Sequelize = require('sequelize');
const db = require('../database');
const PaymentMethod = require('./PaymentMethod');

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

    dt_filme: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
    },

});

Order.belongsTo(PaymentMethod, {
    constraint: true,
    foreignKey: 'id_PaymentMethod'
});

module.exports = Order;