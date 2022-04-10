const Sequelize = require('sequelize');
const db = require('../database');

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
//News.hasMany(User);
module.exports = Combo;