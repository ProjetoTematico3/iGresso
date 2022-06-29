const Movie = require("../model/Movie");
const Image = require("../model/Image");
const Room = require("../model/Room");
const Schedule = require("../model/Schedule");
const Seat = require("../model/Seat");
const Review = require("../model/Review");
const MovieTheater = require("../model/MovieTheater");
const Product = require("../model/Product");
const Combo = require("../model/Combo");
module.exports = {

    async buy(request, response) {
        const { id_schedule } = request.params;

        const scheduleInfo = await Schedule.findByPk(id_schedule, {
            include: [
                { model: Movie, include: [Image, Review] },
                { model: Room, include: Seat }
            ]
        });

        const combos = await Combo.findAll({
            include: {model: Product}
        });

        var theater = await MovieTheater.findByPk(scheduleInfo.Room.id_cinema);

        return response.render('ingress/buy', { title: "Comprar Ingresso" , scheduleInfo: scheduleInfo, theater: theater, combos:combos});
    },




}