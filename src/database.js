const Sequelize = require('sequelize');
const connectionString = "postgres://kpimotsk:hCBHxAPAsYjXFg4tqcdqKl7OT-DkgKtQ@tuffi.db.elephantsql.com/kpimotsk";
// const connectionString = "postgres://echaqdog:0AFZbiV89Im7u19bjJKIa3FeKx-hcaku@kesavan.db.elephantsql.com/echaqdog";
const sequelize = new Sequelize(connectionString, { dialect: 'postgres' });
module.exports = sequelize;