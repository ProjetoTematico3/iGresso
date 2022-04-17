const Sequelize = require('sequelize');
const db = require('../database');
const Member = require('./Member');

const Team = db.define('Team', {
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

Team.hasMany(Member, {
    foreignKey: "id_time"
});

module.exports = Team;