'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Image.init({
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
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Image',
    });
    return Image;
};