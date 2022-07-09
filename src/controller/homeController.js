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

      

        var resArr = [];

        for (let index = 0; index < scheduleList.length; index++) {
            const element = scheduleList[index];
            var check = resArr.find(s => s.id_filme ==element.id_filme );
            if(!check)
                resArr.push(element);
            
        }

        for (let index = 0; index < resArr.length; index++) {
            movieList[index] = await Movie.findByPk(resArr[index].Movie.id, {
                include: [
                    { model: Review },
                    { model: Image }
                ]
            });
        }

        return response.render('home/index', { title: "Página Inicial", scheduleList: resArr, movieList: movieList });
    },

}