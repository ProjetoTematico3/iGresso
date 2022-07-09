const Movie = require("../model/Movie");
const Image = require("../model/Image");
const MovieXGenders = require("../model/MovieXGenders");
const Genders = require("../model/Gender");
const Review = require("../model/Review");
const User = require("../model/User");
const Schedule = require("../model/Schedule");

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
                { model: Image },
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
                { model: Image },
                { model: Schedule }
            ]
        });
        var ngroup = [];
        for (let index = 0; index <  movie.Schedules.length; index++) {
            const Schedules =  movie.Schedules[index];

            const { horario } = Schedules;
            const data = await formatDate(horario);
            var checkItem = ngroup.find(s => s.data == data && s.idioma == Schedules.idioma);
            if(checkItem)
                checkItem.Schedule.push(Schedules);
            else
                ngroup.push({data: data, idioma:Schedules.idioma,  Schedule: [Schedules]})
            
        }
          
          



        return response.render('movie/movie', { title: movie.nome, movie: movie, groupByDate: ngroup });
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
        if (review == undefined || review == null)
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
            order: [
                ["id", "DESC"]
            ]
        })

        return response.render('movie/reviewList', { review_list: review_list });
    }



}


const formatDate = async (data) =>{
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), 
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}