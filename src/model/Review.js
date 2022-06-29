const Sequelize = require('sequelize');
const db = require('../database');
const User = require('./User');

const Review = db.define('Review', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    texto: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },

    id_filme: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false,
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false,
    },

    review_date: {
        type: Sequelize.DATE,
        allowNull: false,
    }

});


Review.belongsTo(User, {
    constraint: true,
    foreignKey: 'id_usuario'
});





module.exports = Review;