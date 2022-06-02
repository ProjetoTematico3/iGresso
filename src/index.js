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
const Product = require('./model/Product');

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

//// Cria produtos senão existir
// (async() => { 
//     try {
//         var checkUser = await Product.findByPk(1);
//         if (checkUser == null) {
//             await Product.create({
//                 nome: 'Pipoca Salgada Grande ',
//                 preco: 26.50,
//                 quantidade: 189,
                
//             })
//             await Product.create({
//                 nome: 'Pipoca Salgada Média ',
//                 preco: 20.45,
//                 quantidade: 205,
                
//             })
//             await Product.create({
//                 nome: 'Pipoca Salgada Pequena ',
//                 preco: 16.50,
//                 quantidade: 225,
                
//             })
//             await Product.create({
//                 nome: 'Pipoca Doce Grande ',
//                 preco: 27.00,
//                 quantidade: 189,
                
//             })
//             await Product.create({
//                 nome: 'Pipoca Doce Média ',
//                 preco: 22.15,
//                 quantidade: 205,
                
//             })
//             await Product.create({
//                 nome: 'Pipoca Doce Pequena ',
//                 preco: 17.70,
//                 quantidade: 225,
                
//             })
//             await Product.create({
//                 nome: 'Refrigerante 900ml',
//                 preco: 18.10,
//                 quantidade: 112,
//             })
//             await Product.create({
//                 nome: 'Refrigerante 500ml',
//                 preco: 12.10,
//                 quantidade: 112,
//             })
//             await Product.create({
//                 nome: 'Refrigerante 300ml',
//                 preco: 8.25,
//                 quantidade: 122,
//             })
//             await Product.create({
//                 nome: 'Refrigerante Lata',
//                 preco: 6.25,
//                 quantidade: 232,
//             })
//             await Product.create({
//                 nome: 'Refrigerante Pet 600ml ',
//                 preco: 10.05,
//                 quantidade: 232,
//             })
//             await Product.create({
//                 nome: 'Cerveja Long Neck',
//                 preco: 13.30,
//                 quantidade: 89,
//             })
//             await Product.create({
//                 nome: 'Salgadinho Doritos 70g',
//                 preco: 6.75,
//                 quantidade: 222,
//             })
//             await Product.create({
//                 nome: 'Salgadinho Doritos 110g',
//                 preco: 15.75,
//                 quantidade: 232,
//             })
//             await Product.create({
//                 nome: 'Salgadinho Doritos 220g',
//                 preco: 28.75,
//                 quantidade: 282,
//             })
//             await Product.create({
//                 nome: 'Salgadinho Ruffles 75g',
//                 preco: 6.80,
//                 quantidade: 222,
//             })
//             await Product.create({
//                 nome: 'Salgadinho Ruffles 120g',
//                 preco: 16.20,
//                 quantidade: 152,
//             })
//             await Product.create({
//                 nome: 'Salgadinho Ruffles 220g',
//                 preco: 26.36,
//                 quantidade: 152,
//             })
//             await Product.create({
//                 nome: 'Bala de Gelatina Finni',
//                 preco: 6.99,
//                 quantidade: 152,
//             })
//             await Product.create({
//                 nome: 'Bala Tubbes Finni',
//                 preco: 6.99,
//                 quantidade: 132,
//             })
//             await Product.create({
//                 nome: 'Chocolate Quente Médio',
//                 preco: 7.99,
//                 quantidade: 232,
//             })
//             await Product.create({
//                 nome: 'Chocolate Quente Grande',
//                 preco: 11.87,
//                 quantidade: 232,
//             })
//             await Product.create({
//                 nome: 'Chocolate Quente Pequeno',
//                 preco: 5.20,
//                 quantidade: 232,
//             })
            
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })();

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
