const Sequelize = require('sequelize');
const db = require('../database');
const Image = require('./Image');

const News = db.define('New', {
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
});

News.hasMany(Image, {
    foreignKey: 'id_image'
});

module.exports = News;