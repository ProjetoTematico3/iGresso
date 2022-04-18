'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Member extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Member.init({
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

        funcao: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        id_time: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'Teams',
                },
                key: 'id'
            },
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'Member',
    });
    return Member;
};