const Sequelize = require('sequelize');
const db = require('../database');


const User = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
    },

    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },

    tipo_usuario:{
        type: Sequelize.INTEGER,
        defaultValue: 0, // 0: root | 1: admin | 2: funcionario | 3: cliente
        allowNull: false,
    }
    
})
 
module.exports = User;