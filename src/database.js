const Sequelize = require('sequelize');
const connectionString = "postgres://kpimotsk:hCBHxAPAsYjXFg4tqcdqKl7OT-DkgKtQ@tuffi.db.elephantsql.com/kpimotsk";
const sequelize = new Sequelize(connectionString, { dialect: 'postgres' });
module.exports = sequelize;