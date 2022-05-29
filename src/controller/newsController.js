const News = require("../model/News");

module.exports = {
    async index(request, response) {
        return response.render('news/index', { title: "Noticias" });
    },

    async create(request, response) {
        return response.render('News/Create', { title: "Cadastro de noticias" });
    },

    async addNews(request, response) {
        const { newsTitle, newsText, newsType } = request.body;
        getBase64(newsText);

        // try {

        //     await News.create({
        //         titulo: news.newsTitle,
        //         texto: news.newsText,
        //         tipo: news.newsType
        //     });

        // } catch (e) {
        //     return response.json({ text: e.message, status: false });
        // }

        // return response.json({ text: "Sucesso.", status: true });
    }
}

function getBase64(text) {
    let base64;
    if (text.indexOf('base64') > 0) {
        base64 = String(text).match(/("data:image)(([^"]+))/gi);
    }
}

// function compressBase64Image(base64Initial) {

// }