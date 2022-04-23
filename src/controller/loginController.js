
const UserModel = require('../model/User');
const bcrypt = require ('bcryptjs');


module.exports = {


    async login(request, response) {

        const {fail} = request.query;
        return response.render('login/login', { title: "Login", fail: fail });
    },




    // async Auth(request, response) {

    //     const {email, password} = request.body;
    //     console.log(email, password);
    
    //     var user = await UserModel.findOne({ where: { email: email} });
    //     if(user == null)
    //         return response.render('login/login', { title: "Login", msg: "Usuário não localizado" });

    //     var compare = await bcrypt.compare(password, user.password)

    //     console.log(compare);

    //     if(!compare)
    //         return response.render('login/login', { title: "Login", msg: "Usuário não localizado" });

    //     var session = request.session;
    //     session.user_id = user.id;
    //     session.user_name = user.name;
    //     session.user_tipo = user.tipo_usuario;


    //     return response.render('Home/index', { title: "Página Inicial" });
    // },

    async logout(request, response) {

        request.logout();
        response.redirect('/');


        return response.redirect('/');
    },

   




}