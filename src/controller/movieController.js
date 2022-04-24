const Movie = require("../model/Movie");
const Image = require("../model/Image");
module.exports = {


    async index(request, response) {
        const movie_list = await Movie.findAll({
            include: Image
        });
        return response.render('movie/index', { title: "Filmes", movie_list: movie_list });
    },

    async movie(request, response) {
       const id = request.params.id;
       const movie = await Movie.findByPk(id, {
           include: Image
       });
       
       return response.render('movie/movie', { title: movie.nome, movie: movie });
    },

  


  

}