'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Team extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Team.hasMany(models.Member, {
                foreignKey: "id_time",
                constraints: true,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }
    Team.init({
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
    }, {
        sequelize,
        modelName: 'Team',
    });
    return Team;
};