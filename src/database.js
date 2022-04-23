const Sequelize = require('sequelize');
const connectionString = "postgres://echaqdog:0AFZbiV89Im7u19bjJKIa3FeKx-hcaku@kesavan.db.elephantsql.com/echaqdog";
const sequelize = new Sequelize(connectionString, { dialect: 'postgres' });
module.exports = sequelize;