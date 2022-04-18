'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
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

            id_cinema: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'MovieTheaters',
                    },
                    key: 'id'
                },
                allowNull: true
            },

            /*id_endereco: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'Adress',
                        //schema: 'public'
                    },
                    key: 'id'
                },
                allowNull: true
            },*/

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

        });

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};