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
        const params = request.body
        console.log(params);

        await Room.create({
            identificacao: request.body.identification
        });

        return response.redirect("/");

    }

}