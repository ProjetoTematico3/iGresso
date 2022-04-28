const Movie = require("../model/Movie");
const Image = require("../model/Image");
const sequelize = require("sequelize");
module.exports = {


    async index(request, response) {
        const movie_list = await Movie.findAll({
            include: Image
        });
        return response.render('movie/index', { title: "Filmes", movie_list: movie_list });
    },


    async list(request, response) {
        const { search } = request.body;
        var where = {};

        if(search){
            where.nome = sequelize.where(sequelize.fn('LOWER', sequelize.col('nome')), 'LIKE', '%' + search + '%');
        }

        const movie_list = await Movie.findAll({
            where: where,
            include: Image
        });
        return response.render('movie/list', { movie_list: movie_list });
    },

    async movie(request, response) {
        const id = request.params.id;
        const movie = await Movie.findByPk(id, {
            include: Image
        });

        return response.render('movie/movie', { title: movie.nome, movie: movie });
    },





}