'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Images', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            diretorio: {
                type: Sequelize.STRING
            },
            tipo_imagem: {
                type: Sequelize.INTEGER
            },
            id_filme: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'Movies',
                    },
                    key: 'id'
                },
                allowNull: true
            },
            id_noticias: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'News',
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
        await queryInterface.dropTable('Images');
    }
};