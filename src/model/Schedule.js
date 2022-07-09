const Sequelize = require('sequelize');
const db = require('../database');
const Room = require('./Room');
const Movie = require('./Movie');
const Schedule = db.define('Schedule', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    data: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    horario: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    idioma: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    tipo_agendamento: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    id_filme: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false,
    }
});

Room.hasMany(Schedule, {
    foreignKey: "id_sala"
});

Schedule.belongsTo(Room, {
    foreignKey: "id_sala"
});

Movie.hasMany(Schedule, {
    foreignKey: "id_filme"
});

Schedule.belongsTo(Movie, {
    foreignKey: "id_filme"
});
// Order.hasMany(Schedule, {
//     foreignKey: 'id_schedule'
// });
module.exports = Schedule;