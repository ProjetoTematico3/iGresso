'use strict';
const { hash } = require('bcryptjs');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [{
            email: 'root@root.com',
            senha: await hash("12345", 8),
            nome: 'root',
            tipo_usuario: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});

    }
};