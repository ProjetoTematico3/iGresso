'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ticket extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Ticket.belongsTo(models.Schedule, {
                constraint: true,
                foreignKey: 'id_ingresso',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });

            Ticket.belongsTo(models.Seat, {
                constraint: true,
                foreignKey: "id_ingresso",
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });

            Ticket.belongsTo(models.Item, {
                constraint: true,
                foreignKey: 'id_ingresso',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            })

            Ticket.belongsTo(models.Movie, {
                constraint: true,
                foreignKey: "id_ingresso",
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
        }
    }
    Ticket.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        tipo_ingresso: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Ticket',
    });
    return Ticket;
};