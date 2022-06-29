const { redirect } = require('express/lib/response');
const Adress = require('../model/Adress');
const MovieTheater = require('../model/MovieTheater')
const Room = require('../model/Room');
const Seat = require('../model/Seat');

module.exports = {

    async index(request, response) {

        const movieTheater_list = await MovieTheater.findAll({
            include: Adress
        });


        return response.render('room/index', { title: "Cadastro de Salas", movieTheater_list: movieTheater_list });
    },

    async create(request, response) {
        identification = request.body.identification;
        colunas = request.body.column;
        assentos = request.body.capacity;
        id_movieTheater = request.body.selectMovieTheater;

        try {
            await Room.create({
                identificacao: identification,
                colunas: colunas,
                assentos: assentos,
                id_cinema: id_movieTheater
            }).then(async (room) => {

                var min_letter = 65
                var max_letter = 90;
                var current_letter = min_letter;

                for (var i = 0; i < assentos; i++) {
                    for (var j = 0; j < colunas; j++) {
                        
                        var seat_desc = String.fromCodePoint(current_letter) + (j+1);
                        await Seat.create({
                            identificacao: seat_desc,
                            id_sala: room.id
                        });

                        

                    }

                    current_letter++;
                    if(current_letter == max_letter) current_letter = min_letter;

                }



            });








        } catch (e) {
            return response.json({ text: e.message, status: false });
        }

        // let res = encodeURIComponent("Sala criada com sucesso");
        return response.redirect("/Schedule");

        //return response.json({ text: "Sala criada com sucesso", status: true });

    }

}