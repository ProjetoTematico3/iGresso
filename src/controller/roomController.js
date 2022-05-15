const { redirect } = require('express/lib/response');
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

    async create(request, response) {
        identification = request.body.identification;
        capacity = request.body.capacity;
        id_movieTheater = request.body.selectMovieTheater;

        try {
            await Room.create({
                identificacao: identification,
                capacidade: capacity,
                id_cinema: id_movieTheater
            });
        } catch (e) {
            return response.json({ text: e.message, status: false });
        }

        // let res = encodeURIComponent("Sala criada com sucesso");
        return response.redirect("/Schedule");

        //return response.json({ text: "Sala criada com sucesso", status: true });

    }

}