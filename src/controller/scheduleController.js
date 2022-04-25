const MovieTheater = require('../model/MovieTheater');
const Room = require('../model/Room');

module.exports = {

    async index(request, response) {
        const movieTheater_list = MovieTheater.findAll({
            include: Room
        });

        const rooms_list = Room.findAll();

        return response.render("schedule/index", { title: "Cadastro de horários", rooms_list: rooms_list, movieTheater_list: movieTheater_list });
    }

}