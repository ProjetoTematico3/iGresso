const Movie = require("../model/Movie");
const Image = require("../model/Image");
const MovieXGenders = require("../model/MovieXGenders");
const Genders = require("../model/Gender");
const Review = require("../model/Review");
const User = require("../model/User");

const sequelize = require("sequelize");
module.exports = {


    async index(request, response) {
        return response.render('movie/index', { title: "Filmes" });
    },


    async list(request, response) {
        const { search } = request.body;
        var where = {};

        if (search) {
            where.nome = sequelize.where(sequelize.fn('LOWER', sequelize.col('nome')), 'LIKE', '%' + search + '%');
        }

        const movie_list = await Movie.findAll({
            where: where,
            include: [
                { model: Review },
                { model: Image }
            ]
        });
        return response.render('movie/list', { movie_list: movie_list });
    },

    async movie(request, response) {
        const id = request.params.id;
        const movie = await Movie.findByPk(id, {
            include: [
                { model: Review },
                { model: MovieXGenders, include: Genders },
                { model: Image }
            ]
        });

        return response.render('movie/movie', { title: movie.nome, movie: movie });
    },

    async addReview(request, response) {

        const { text, rating, id_movie } = request.body;
        const loggedUser = request.session.passport.user;

        await Review.create({
            texto: text,
            likes: rating,
            id_filme: id_movie,
            id_usuario: loggedUser.id,
            review_date: new Date()
        });

        return response.json({ text: "Sucesso.", status: true });

    },

    async deleteReview(request, response) {
        const { id } = request.query;

        const review = await Review.findByPk(id);
        if(review == undefined || review == null)
            return response.json({ text: "Registro não localizado", status: false });
        
        await Review.destroy({ where: { id: id } });
        return response.json({ text: "Sucesso", status: true, id_movie: review.id_filme });
    },

    async reviewList(request, response) {

        const { id_movie } = request.body;

        const review_list = await Review.findAll({
            include: User,
            where: {
                id_filme: id_movie
            },
            order: [["id", "DESC"]]
        })

        return response.render('movie/reviewList', { review_list: review_list });
    }



}