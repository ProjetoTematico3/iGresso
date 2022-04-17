const Sequelize = require('sequelize');
const db = require('../database');
const Adress = require('./Adress');
const Review = require('./Review');
const News = require('./News');
const Order = require('./Order');

const User = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    tipo_usuario: {
        type: Sequelize.INTEGER,
        defaultValue: 0, // 0: root | 1: admin | 2: funcionario | 3: cliente
        allowNull: false,
    }

});


User.belongsTo(Adress, {
    constraint: true,
    foreignKey: "id_endereco"
});

User.hasMany(Review, {
    foreignKey: "id_usuario"
});

User.hasMany(News, {
    foreignKey: "id_usuario"
});

User.hasMany(Order, {
    foreignKey: "id_usuario"
});


module.exports = User;