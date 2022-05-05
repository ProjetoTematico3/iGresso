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

        const schedule = request.body;

        let time = schedule.time;
        let date = schedule.date;

        time = date + ' ' + time + ':00';
        let result = Date.parse(time);

        try {
            await Schedule.create({
                data: schedule.date,
                horario: result,
                idioma: schedule.language,
                id_filme: schedule.movieId,
                id_sala: schedule.roomId,
                tipo_agendamento: schedule.frontCover
            });
        } catch (e) {
            return response.json({ text: e.message, status: false });
        }
        return response.redirect(300, "/");
        //return response.json({ text: "Agendamento realizado com sucesso", status: true });

    }

}