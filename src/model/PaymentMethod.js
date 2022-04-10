const Sequelize = require('sequelize');
const db = require('../database');


const PaymentMethod = db.define('PaymentMethod', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    tipo: {
        type: Sequelize.STRING,
        allowNull: false,
    },


});

module.exports = PaymentMethod;