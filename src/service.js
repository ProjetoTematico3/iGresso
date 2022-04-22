const { workerData, parentPort } = require('worker_threads');
const path = require('path');
const fs = require('fs');
const api = require("./api");
const db = require("./database");
const Movie = require("./model/Movie");
const Image = require("./model/Image");
const interval = 10 * 1000 //10 segundos;

const run = async () => {
    var CURRENT_PAGE = 1, END_PAGE = 1;
    while (CURRENT_PAGE <= END_PAGE) {

        try {
            const result = await api.get('/discover/movie', {
                params: {
                    include_adult: false,
                    primary_release_year: new Date().getFullYear(),
                    page: CURRENT_PAGE
                }
            });


            END_PAGE = result.data.total_pages ?? 1;
            CURRENT_PAGE++
            await handleMovies(result.data.results);
        } catch (error) {
            console.log(error);
        }
    }

    setTimeout(run, interval);
}

const handleMovies = async (data) => {

    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        await Movie.create({
            nome: element.title,
            descricao: element.overview,
            dt_lancamento: element.release_date,
            duracao: 99999,
            api_id: element.id
        }).then(async (movie) => {

            await downloadImageMovie(movie.id, element.backdrop_path, 1);
            await downloadImageMovie(movie.id, element.poster_path, 2);

        });



    }
}

const downloadImageMovie = async (id, sub_path, image_type) => {
    const image_url = `https://image.tmdb.org/t/p/w500${sub_path}`;
    const movie_path = path.resolve(__dirname, 'public', 'images', id.toString());
    const full_path = movie_path + sub_path;
    await fs.promises.mkdir(movie_path, { recursive: true })
    const writer = await fs.createWriteStream(full_path);
    const response = await api.get(image_url, { responseType: 'stream' });
    await response.data.pipe(writer);

    Image.create({
        diretorio: full_path,
        tipo_imagem: image_type,
        id_filme: id
    });


}


run();

