'use strict';

const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Adress, {
                constraints: true,
                foreignKey: "id_usuario",
                onDelete: 'cascade',
                onUpdate: 'cascade'
            });

            User.hasMany(models.Order, {
                constraints: true,
                foreignKey: "id_usuario",
                onDelete: 'cascade',
                onUpdate: 'cascade'
            });

            User.hasMany(models.News, {
                constraints: true,
                foreignKey: "id_usuario",
                onDelete: 'cascade',
                onUpdate: 'cascade'
            });

            User.hasMany(models.Review, {
                constraints: true,
                foreignKey: "id_usuario",
                onDelete: 'cascade',
                onUpdate: 'cascade'
            });

        }
    }
    User.init({

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },

        senha: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },

        tipo_usuario: {
            type: Sequelize.INTEGER,
            defaultValue: 0, // 0: root | 1: admin | 2: funcionario | 3: cliente
            allowNull: false,
        },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: new Date(),
            allowNull: false
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: new Date(),
            allowNull: false
        },

    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};