const Sequelize = require('sequelize');
const db = require('../database');

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
//News.hasMany(User);
module.exports = Review;