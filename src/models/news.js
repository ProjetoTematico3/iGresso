'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class News extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            News.hasMany(models.Image, {
                foreignKey: 'id_noticia',
                constraint: true,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }
    News.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        titulo: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        texto: {
            type: Sequelize.STRING,
            allowNull: false,
        }


    }, {
        sequelize,
        modelName: 'News',
    });
    return News;
};