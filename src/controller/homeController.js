module.exports = {


    async index(request, response) {
        return response.render('home/index', { title: "Página Inicial" });
    },

    async login(request, response) {
        return response.render('home/login', { title: "Login" });
    },


  

}