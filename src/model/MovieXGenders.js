const Sequelize = require('sequelize');
const db = require('../database');
const Movie = require('./Movie');
const Gender = require('./Gender');

const MovieXGenders = db.define('MovieXGenders', {
    
    id_movie: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
    id_gender: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
});

Movie.hasMany(MovieXGenders, {
    foreignKey: 'id_movie'
});
Gender.hasMany(MovieXGenders, {
    foreignKey: 'id_gender'
});

MovieXGenders.belongsTo(Movie, {
    constraint: true,
    foreignKey: "id_movie"
});
MovieXGenders.belongsTo(Gender, {
    constraint: true,
    foreignKey: "id_gender"
});

module.exports = MovieXGenders;