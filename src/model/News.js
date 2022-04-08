const Sequelize = require('sequelize');
const db = require('../database');
const User = require('../model/User');

const News = db.define('Exam', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    texto: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})
News.hasMany(User);
module.exports = News;