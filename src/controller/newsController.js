const News = require("../model/News");

module.exports = {
    async index(request, response) {
        return response.render('news/index', { title: "Noticias" });
    },

    async create(request, response) {
        return response.render('News/Create', { title: "Cadastro de noticias" });
    },

    async addNews(request, response) {
        const news = request.body;
        console.log(news.newsType)
        try {

            await News.create({
                titulo: news.newsTitle,
                texto: news.newsText,
                tipo: news.newsType
            });

        } catch (e) {
            return response.json({ text: e.message, status: false });
        }

        return response.json({ text: "Sucesso.", status: true });
    }

}