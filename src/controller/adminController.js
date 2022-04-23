const appMovies = require('../utils/appMovies')

module.exports = {


    async index(request, response) {
        return response.render('admin/index', { title: "Administração" });
    },

    async syncImages(request, response) {
     
            const sync = await appMovies.syncImages();
            return response.json({ text: "Sincronização Completa", status: true});
   
       
        
    },






}