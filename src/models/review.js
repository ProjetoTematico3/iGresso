'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Review.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        texto: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        likes: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Review',
    });
    return Review;
};