const Adress = require('../model/Adress');
const MovieTheater = require('../model/MovieTheater')
const Room = require('../model/Room');

module.exports = {

    async index(request, response) {

        const movieTheater_list = await MovieTheater.findAll({
            include: Adress
        });


        return response.render('room/index', { title: "Cadastro de Salas", movieTheater_list: movieTheater_list });
    },

    async insertRoom(request, response) {

        await Room.create({
            identificacao: request.body.identification,
            id_cinema: request.body.selectMovieTheater
        });

        return response.json({ text: "Sala criada com sucesso", status: true });

    }

}