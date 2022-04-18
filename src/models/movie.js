'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Movie extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            Movie.belongsTo(models.Team, {
                constraint: true,
                foreignKey: "id_filme",
                onDelete: 'cascade',
                onUpdate: 'cascade',
            });

            Movie.hasMany(models.Image, {
                constraint: true,
                foreignKey: "id_filme",
                onDelete: 'cascade',
                onUpdate: 'cascade'
            });
        }
    }
    Movie.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        descricao: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        dt_lancamento: {
            type: Sequelize.DATE,
            allowNull: false,
        },

        duracao: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Movie',
    });
    return Movie;
};