const express = require('express');
const routes = require('./routes');
const app = express();
const path = require('path');
const { hash } = require('bcryptjs');
const passport = require('passport')
const session = require('express-session');
const appMovies = require('./utils/appMovies');
const db = require('./database');
const sequelize = require('./database');

// Models utilizadas para inserir no banco os dados
const User = require('./model/User');
const Adress = require('./model/Adress');
const MovieTheater = require('./model/MovieTheater');

// Repositorio com todas as models
const repository = require('./model/modelRepository');

require('./authentication')(passport);
app.set('trust proxy', 1)
app.use(session({
    secret: 'macarena',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }
}))

app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    if (req.session.passport)
        res.locals.user = req.session.passport.user;
    next();
});

app.use(routes);


app.use('/src/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');
//db.sync({ force: true }); 
// Cria usuário Admin senão existir
// (async() => { 
//     try {
//         var checkUser = await User.findByPk(1);
//         if (checkUser == null) {
//             await User.create({
//                 email: 'root@root.com',
//                 senha: await hash("12345", 8),
//                 nome: 'root',
//                 tipo_usuario: 0
//             })
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })();

// // Cria Endereço senão existir
// (async() => {
//     try {
//         var checkAdress = await Adress.findByPk(1);
//         if (checkAdress == null) {
//             await Adress.create({
//                 bairro: "Rio Branco",
//                 numero: 425,
//                 cidade: "Caxias do Sul"
//             })
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })();

// // // Cria Cinema senão existir
// (async() => {
//     try {
//         var checkMovieTheater = await MovieTheater.findByPk(1);
//         if (checkMovieTheater == null) {
//             await MovieTheater.create({
//                 nome: "Cinépolis",
//                 id_endereco: 1
//             })
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })();

// Derruba o banco e o recria com todas as models e inserts
//  db.sync({ force: true }); 

//  Busca na API os filmes para serem inseridos no banco
// appMovies.startService().catch(err => console.error(err));
app.listen(2078);