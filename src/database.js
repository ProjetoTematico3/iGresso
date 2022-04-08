const Sequelize = require('sequelize');
const connectionString = "postgres://bmnzefbl:6LsZq1Hb-uId8yYhtBY_UYDDsyk07D8q@tuffi.db.elephantsql.com/bmnzefbl";
const sequelize = new Sequelize(connectionString, {dialect: 'postgres'}); 
module.exports = sequelize;