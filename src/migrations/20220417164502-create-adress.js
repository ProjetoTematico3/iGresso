'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Adresses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            bairro: {
                type: Sequelize.STRING
            },
            numero: {
                type: Sequelize.INTEGER
            },
            cidade: {
                type: Sequelize.STRING
            },
            id_usuario: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'Users',
                        //schema: 'public'
                    },
                    key: 'id'
                },
                allowNull: true
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Adresses');
    }
};