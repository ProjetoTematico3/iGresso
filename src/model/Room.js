const Sequelize = require('sequelize');
const db = require('../database');

const Room = db.define('Room', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        identificacao: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
    //News.hasMany(User);
module.exports = Room;