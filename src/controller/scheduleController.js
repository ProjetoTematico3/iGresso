const Movies = require('../model/Movie')
const Room = require('../model/Room');
const Schedule = require('../model/Schedule');

module.exports = {

    async index(request, response) {

        const room_list = await Room.findAll();
        const movie_list = await Movies.findAll();

        return response.render("schedule/index", { title: "Cadastro de horários", room_list: room_list, movie_list: movie_list });
    },

    async create(request, response) {
        let roomId = request.body.selectRoom;
        let movieId = request.body.selectMovie;
        let language = request.body.selectLanguage;
        let date = request.body.date;
        let time = request.body.time;

        time = date + 'T' + time + ':00-03:00';

        try {
            await Schedule.create({
                data: date,
                horario: result,
                idioma: language,
                id_filme: movieId,
                id_sala: roomId,
            });
        } catch (e) {

            return response.json({ text: e.message, status: false });
        }

        return response.json({ text: "Sala criada com sucesso", status: true });

    }

}