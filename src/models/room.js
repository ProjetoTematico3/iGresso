'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Room.hasMany(models.Schedule, {
                foreignKey: "id_sala",
                constraint: true,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });

            Room.hasMany(models.Seat, {
                foreignKey: "id_sala",
                constraint: true,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
        }
    }
    Room.init({
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
    }, {
        sequelize,
        modelName: 'Room',
    });
    return Room;
};