const Member = require('../model/Member');

module.exports = {

    async index(request, response) {

        return response.render('members/index', { title: "Cadastrar fucionario" });
    },
    



}