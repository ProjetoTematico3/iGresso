'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Combos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            descricao: {
                type: Sequelize.STRING
            },
            preco: {
                type: Sequelize.DOUBLE
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
        await queryInterface.dropTable('Combos');
    }
};