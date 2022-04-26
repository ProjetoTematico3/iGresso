const Sequelize = require('sequelize');
const sequelize = require('../database');
const db = require('../database');
const Schedule = require('./Schedule');
const Seat = require('./Seat');

const Register = db.define('Register',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        tyoe: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        tyoe: Sequelize.STRING,
        allowNull: false 
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    

});

Register.hasMany(Schedule, {
    foreignKey: "id_user"
});

Register.hasMany(Seat, {
    foreignKey: "id_user"
});

module.exports = Register;