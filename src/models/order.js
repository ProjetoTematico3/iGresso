'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            Order.belongsTo(models.PaymentMethod, {
                constraints: true,
                foreignKey: 'id_pedido',
                onDelete: 'cascade',
                onUpdate: 'cascade'
            });

            Order.hasMany(models.Item, {
                constraints: true,
                foreignKey: 'id_pedido',
                onDelete: 'cascade',
                onUpdate: 'cascade'
            });

            Order.hasMany(models.Combo, {
                constraints: true,
                foreignKey: 'id_pedido',
                onDelete: 'cascade',
                onUpdate: 'cascade'
            });
        }
    }
    Order.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        dt_cadastro: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
        },

        dt_filme: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
        }

    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};