const Sequelize = require('sequelize');
const db = require('../database');

const Image = db.define('Image', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    diretorio: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    tipo_imagem: {
        type: Sequelize.INTEGER,
        defaultValue: 0, // 0: normal | 1: fundo | 2: poster
        allowNull: false,
    },
});

module.exports = Image;