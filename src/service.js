const { workerData, parentPort } = require('worker_threads');
const movieService = require('./utils/appMovies')

const interval = 1000 * 1000 //10 segundos;
const run = async () => {

    movieService.downloadMovies();

    setTimeout(run, interval);
}

run();

