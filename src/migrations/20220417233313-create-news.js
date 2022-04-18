'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('News', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            titulo: {
                type: Sequelize.STRING
            },
            texto: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            id_usuario: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'Users',
                    },
                    key: 'id'
                },
                allowNull: true
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('News');
    }
};