const express = require('express');
const routes = require('./routes');
const app = express();
const path = require('path');
const { hash } = require('bcryptjs');
const passport = require('passport')
const session = require('express-session');
const appMovies = require('./utils/appMovies');

const db = require('./database');
// const User = require('./model/User');
const sequelize = require('./database');
//const Item = require('./model/Item');
//const Order = require('./model/Order');

//const repository = require('./model/modelRepository'); 


require('./authentication')(passport);
app.set('trust proxy', 1)
app.use(session({
    secret: 'macarena',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }
}))
app.use(express.urlencoded({ extended: true }))
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
// db.sync({ force: true });
// (async() => {
//     try {
//         await db.sync({ force: true });
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

appMovies.startService().catch(err => console.error(err));
app.listen(2078);