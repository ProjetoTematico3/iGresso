const Sequelize = require('sequelize');
const connectionString = "postgres://lbaryjhp:UiJ_K3Hnw27QsK2dZBmgcNXRywlTcRJW@tuffi.db.elephantsql.com/lbaryjhp";
const sequelize = new Sequelize(connectionString, { dialect: 'postgres' });
module.exports = sequelize;