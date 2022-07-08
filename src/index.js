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
const cors = require('cors');

// Models utilizadas para inserir no banco os dados
const User = require('./model/User');
const Adress = require('./model/Adress');
const MovieTheater = require('./model/MovieTheater');
const Product = require('./model/Product');
const Combo = require('./model/Combo');
const PaymentMethod = require('./model/PaymentMethod');

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
app.use(cors());

app.use('/src/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');
//db.sync({ force: true }); 

// Cria produtos se não existir
// (async() => { 
//     try {
//         var checkUser = await Product.findByPk(1);
//         if (checkUser == null) {
//             await Combo.create({
//                 descricao: "Combo 1",
//                 preco: 42
//             })

//             await Combo.create({
//                 descricao: "Combo 2",
//                 preco: 36
//             })

//             await Product.create({
//                 nome: 'Pipoca Salgada Grande ',
//                 preco: 26.50,
//                 quantidade: 1,
//                 id_combo: 1

//             })
//             await Product.create({
//                 nome: 'Pipoca Salgada Média ',
//                 preco: 20.45,
//                 quantidade: 205,

//             })
//             await Product.create({
//                 nome: 'Pipoca Salgada Pequena ',
//                 preco: 16.50,
//                 quantidade: 1,
//                 id_combo: 2

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
//                 quantidade: 2,
//                 id_combo: 1
//             })
//             await Product.create({
//                 nome: 'Refrigerante 300ml',
//                 preco: 8.25,
//                 quantidade: 1,
//                 id_combo: 2
//             })
//             await Product.create({
//                 nome: 'Refrigerante Lata',
//                 preco: 6.25,
//                 quantidade: 232,
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
//                 quantidade: 1,
//                 id_combo: 1
//             })

           

//         }
//     } catch (error) {
//         console.log(error);
//     }
// })();

// //Cria usuário Admin se não existir
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

// // Cria Endereço se não existir
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


// // Cria Métodos de Pagamento se não existir
// (async() => { 
//     try {
//         var checkPay= await PaymentMethod.findByPk(1);
//         if (checkPay == null) {
//             await PaymentMethod.create({
//                 tipo: "Cartão de Crédito"
//             });
//             await PaymentMethod.create({
//                 tipo: "PIX"
//             });
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })();


// Derruba o banco e o recria com todas as models e inserts
//db.sync({ force: true }); 

//  Busca na API os filmes para serem inseridos no banco
//appMovies.startService().catch(err => console.error(err));
app.listen(2078);
