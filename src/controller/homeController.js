const Schedule = require('../model/Schedule');
const Movie = require('../model/Movie');
const Image = require('../model/Image');
const Review = require('../model/Review');

module.exports = {

    async index(request, response) {

        const movieList = [];
        const scheduleList = await Schedule.findAll({
            include: 'Movie',
        });

        for (let index = 0; index < scheduleList.length; index++) {
            movieList[index] = await Movie.findByPk(scheduleList[index].Movie.id, {
                include: [
                    { model: Review },
                    { model: Image }
                ]
            });
        }

        return response.render('home/index', { title: "Página Inicial", scheduleList: scheduleList, movieList: movieList });
    },

}