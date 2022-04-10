const Sequelize = require('sequelize');
const db = require('../database');
const Schedule = require('./Schedule');
const Seat = require('./Seat');
const Movie = require('./Movie');
const Item = require('./Item');

const Ingress = db.define('Ingress', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    tipo_ingresso: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

Ingress.belongsTo(Schedule, {
    constraint: true,
    foreignKey: 'id_Schedule'
});

Ingress.belongsTo(Seat, {
    constraint: true,
    foreignKey: "id_Seat"
});

Ingress.belongsTo(Item, {
    constraint: true,
    foreignKey: 'id_item'
})

Ingress.belongsTo(Movie, {
    constraint: true,
    foreignKey: "id_Movie"
});


module.exports = Ingress;