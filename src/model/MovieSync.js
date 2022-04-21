const Sequelize = require('sequelize');
const db = require('../database');

const MovieSync = db.define('MovieSync', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    last_sync: {
        type: Sequelize.DATE,
        allowNull: false,
    },
});


module.exports = MovieSync;