const News = require("../model/News");
const Images = require("../model/Image");
const fs = require('fs');
const path = require("path");



module.exports = {
    async index(request, response) {
        return response.render('news/index', { title: "Noticias" });
    },

    async create(request, response) {
        return response.render('News/Create', { title: "Cadastro de noticias" });
    },

    async addNews(request, response) {
        let { newsTitle, newsText, newsType } = request.body;
        const imageBase64 = getBase64(newsText);
        newsText = removeBase64(newsText);


        // try {

        //     await News.create({
        //         titulo: newsTitle,
        //         texto: newsText,
        //         tipo: newsType,

        //     });

        // } catch (e) {
        //     return response.json({ text: e.message, status: false });
        // }

        // return response.json({ text: "Sucesso.", status: true });
        // const path = saveImage(imageBase64, idNews);
    }
}

function getBase64(text) {
    let base64;
    if (text.indexOf('base64') > 0) {
        // base64 = String(text).match(/("data:image)(([^"]+))/gi);
        base64 = String(text).match(/(base64)(([^"]+))/gi);
        base64 = base64.toString().replace('base64', '');
        return base64;
    }
}

function removeBase64(text) {
    let newText;
    newText = String(text).replace(/(base64)(([^"]+))/gi, '');
    imgIndex = String(newText).replace(/(width)|(src)|(style)|(data-filename)(([^"]+))/gi, '')


    console.log(newText);
    console.log(imgIndex);

    return newText;
}

async function saveImage(image, id) {
    const rootPath = path.resolve(__dirname.replace('controller', ''), 'public', 'images')
    const newsPath = rootPath + path.join("/News");
    const ext = ".jpg";


    let time = path.resolve(newsPath)

    console.log(time)


    try {

        if (fs.existsSync(newsPath)) {
            fs.writeFileSync(newsPath + "/name.jpg", image, { encoding: 'base64' });
        } else {
            fs.mkdir(newsPath, (e) => {
                if (e) {
                    console.log(e.message);
                } else {
                    fs.writeFileSync(newsPath + "/name.jpg", image, { encoding: 'base64' });
                }
            });
        }

    } catch (e) {
        console.log(e.message);
    }

}