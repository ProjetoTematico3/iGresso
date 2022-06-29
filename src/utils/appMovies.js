
const { download } = require('express/lib/response');
const { Worker } = require('worker_threads');
const path = require('path');
const fs = require('fs');
const api = require("../api");
const db = require("../database");
const Movie = require("../model/Movie");
const Image = require("../model/Image");
const Gender = require("../model/Gender");
const MovieXGenders = require("../model/MovieXGenders");


module.exports = {
  async startService() {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./src/service.js');
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      })
    })
  },

  async syncImages() {
    var movieList = await Movie.findAll();
    for (let index = 0; index < movieList.length; index++) {
      const movie = movieList[index];
      await this.downloadMovies(movie.api_id);
    }
  },

  async downloadMovies(movie_id = null) {

    if (movie_id != null) {
      try {
        const result = await api.get(`/movie/${movie_id}`);
        await createMovie(result.data, true);
      } catch (error) {
        console.log(error);
      }
    }
    else {
      var CURRENT_PAGE = 1, END_PAGE = 3;
      while (CURRENT_PAGE <= END_PAGE) {
        try {
          const result = await api.get('/discover/movie', {
            params: {
              primary_release_year: new Date().getFullYear(),
              page: CURRENT_PAGE
            }
          });
          // END_PAGE = result.data.total_pages ?? 1;
          CURRENT_PAGE++
          await handleMovies(result.data.results);
        } catch (error) {
          console.log(error);
        }
      }
    }



  }
}


const handleMovies = async (data) => {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    await createMovie(element);
  }
}

const createMovie = async (element, download_images = false) => {
  var checkMovie = await Movie.findAll({
    where: {
      api_id: element.id
    }
  });

  if (checkMovie.length == 0) {
    var classificacao = "--";

    const result = await api.get(`/movie/${element.id}`);
    try {
      const release_dates = result.data.release_dates.results.find(s => s.iso_3166_1 == "BR").release_dates;
      if (release_dates != undefined && release_dates != null && release_dates.length > 0) {
        classificacao = release_dates[0].certification;
      }

      if (result.data.genres != undefined && result.data.genres != null && result.data.genres.length > 0) {
        for (let index = 0; index < result.data.genres.length; index++) {
          const element = result.data.genres[index];
          await AddGender(element);
        }
      }

    } catch (error) {

    }


    await Movie.create({
      nome: element.title,
      descricao: element.overview,
      dt_lancamento: element.release_date,
      duracao: 99999,
      classificacao: classificacao,
      api_id: element.id
    }).then(async (movie) => {

      if (result.data.genres != undefined && result.data.genres != null && result.data.genres.length > 0) {
        for (let index = 0; index < result.data.genres.length; index++) {
          const element = result.data.genres[index];
          await SetGender(movie.id, element.id);
        }
      }

      await downloadImageMovie(movie.id, element.backdrop_path, 1);
      await downloadImageMovie(movie.id, element.poster_path, 2);

    });
  }
  else if (download_images) {
    await downloadImageMovie(checkMovie[0].id, element.backdrop_path, 1);
    await downloadImageMovie(checkMovie[0].id, element.poster_path, 2);
  }


}

const downloadImageMovie = async (id, sub_path, image_type) => {
  try {
    const image_url = `https://image.tmdb.org/t/p/w500${sub_path}`;
    var root_path = __dirname; root_path = root_path.replace("utils", "public");
    const movie_path = path.resolve(root_path, 'images', id.toString());
    const full_path = movie_path + sub_path;
    await fs.promises.mkdir(movie_path, { recursive: true })
    const writer = await fs.createWriteStream(full_path);
    const response = await api.get(image_url, { responseType: 'stream' });
    await response.data.pipe(writer);

    await Image.destroy({
      where: {
        id_filme: id,
        tipo_imagem: image_type
      }
    });

    Image.create({
      diretorio: sub_path,
      tipo_imagem: image_type,
      id_filme: id
    });
  } catch (error) {

  }

}

const AddGender = async (gender) => {
  var checkGender = await Gender.findAll({
    where: {
      api_id: gender.id
    }
  });
  if (checkGender.length == 0) {
    await Gender.create({
      nome: gender.name,
      api_id: gender.id
    });
  }
}

const SetGender = async (id_movie, api_id_gender) => {
  var checkGender = await Gender.findAll({
    where: {
      api_id: api_id_gender
    }
  });
  if (checkGender.length > 0) {
    await MovieXGenders.create({
      id_movie: id_movie,
      id_gender: checkGender[0].id
    });
  }


}




