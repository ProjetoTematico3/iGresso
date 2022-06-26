const News = require("../model/News");
const Images = require("../model/Image");
const upload = require('../utils/multerConfig');


module.exports = {
    async index(request, response) {
        return response.render('news/index', { title: "Noticias" });
    },

    async create(request, response) {
        return response.render('News/Create', { title: "Cadastro de noticias" });
    },

    async addNews(request, response) {
        upload.single("newsImage");
        let { newsTitle, newsText, newsType } = request.body;

        console.log(request.body);
        try {
            await News.create({
                titulo: newsTitle,
                texto: newsText,
                tipo: newsType,
            });

        } catch (e) {
            return response.json({ text: e.message, status: false });
        }

        return response.json({ text: "Sucesso.", status: true });

    },




}