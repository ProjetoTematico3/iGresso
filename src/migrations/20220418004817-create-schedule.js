'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Schedules', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            dia: {
                type: Sequelize.DATE
            },
            horario: {
                type: Sequelize.DATEONLY
            },
            idioma: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Schedules');
    }
};