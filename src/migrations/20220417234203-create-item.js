'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Items', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            valor: {
                type: Sequelize.DOUBLE
            },
            quantidade: {
                type: Sequelize.INTEGER
            },
            id_pedido: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'Orders',
                    },
                    key: 'id'
                },
                allowNull: true
            },
            id_ingresso: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'Tickets',
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
        await queryInterface.dropTable('Items');
    }
};