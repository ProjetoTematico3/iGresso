const Schedule = require('../model/Schedule');
const Movie = require('../model/Movie');
const Image = require('../model/Image');
const Review = require('../model/Review');

module.exports = {

    async index(request, response) {


        return response.render('order/index', { title: "Meus Ingressos" });
    },

}