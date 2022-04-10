const Sequelize = require('sequelize');
const db = require('../database');
const Movie = require('./Movie');

const Review = db.define('Review', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    texto: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

});

Review.belongsTo(Movie, {
    constraint: true,
    foreignKey: 'id_filme'
});

module.exports = Review;