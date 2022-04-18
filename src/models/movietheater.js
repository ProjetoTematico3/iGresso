'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MovieTheater extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MovieTheater.belongsTo(models.Adress, {
                foreignKey: "id_cinema",
                constraint: true,
                onDelete: true,
                onUpdate: true
            });

            MovieTheater.hasMany(models.Room, {
                foreignKey: "id_cinema",
                constraint: true,
                onDelete: true,
                onUpdate: true
            });

            MovieTheater.hasMany(models.User, {
                foreignKey: "id_cinema",
                constraint: true,
                onDelete: true,
                onUpdate: true
            });

            MovieTheater.hasMany(models.Ticket, {
                foreignKey: "id_cinema",
                constraint: true,
                onDelete: true,
                onUpdate: true
            });
        }
    }
    MovieTheater.init({
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
    }, {
        sequelize,
        modelName: 'MovieTheater',
    });
    return MovieTheater;
};