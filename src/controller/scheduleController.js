const MovieTheater = require('../model/MovieTheater');
const Movies = require('../model/Movie')
const Room = require('../model/Room');
const Schedule = require('../model/Schedule');

module.exports = {

    async index(request, response) {

        const room_list = await Room.findAll();
        const movie_list = await Movies.findAll();

        return response.render("schedule/index", { title: "Cadastro de horários", room_list: room_list, movie_list: movie_list });
    },

    async insertSchedule(request, response) {
        roomId = request.body.selectRoom;
        movieId = request.body.selectMovie;
        language = request.body.selectLanguage;
        date = request.body.date;
        time = request.body.time;

        try {
            await Schedule.create({
                id_sala: roomId,
                id_filme: movieId,
                idioma: language,
                data: date,
                horario: time,
            });
        } catch (e) {

            return response.json({ text: e.message, status: false });
        }

        return response.json({ text: "Sala criada com sucesso", status: true });

    }

}