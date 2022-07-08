const Sequelize = require('sequelize');
const db = require('../database');
const Schedule = require('./Schedule');
const Seat = require('./Seat');
const Movie = require('./Movie');
const Item = require('./Item');
const Combo = require('./Combo');
const Ingress = db.define('Ingress', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    tipo_ingresso: { //0-inteira, 1-meia
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

Ingress.belongsTo(Schedule, {
    constraint: true,
    foreignKey: 'id_horario'
});

Ingress.belongsTo(Seat, {
    constraint: true,
    foreignKey: "id_lugar"
});


Item.hasOne(Ingress, {
    foreignKey: 'id_ingresso'
});

Item.hasOne(Combo, {
    foreignKey: 'id_combo'
});



module.exports = Ingress;