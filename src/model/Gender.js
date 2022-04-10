const Sequelize = require('sequelize');
const db = require('../database');

const Gender = db.define('Gender', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});
//News.hasMany(User);
module.exports = Gender;