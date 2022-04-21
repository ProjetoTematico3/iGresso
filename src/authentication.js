const bcrypt = require('bcryptjs');
const sequelize = require('./database');
const UserModel = require('./model/User');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {


    passport.serializeUser((user, done) => {

        done(null, { id: user.id, nome: user.nome, tipo_usuario: user.tipo_usuario });

    });

    passport.deserializeUser(async(_user, done) => {
        try {
            const user = await UserModel.findByPk(_user.id);
            done(null, user);
        } catch (err) {
            console.log(err);
            done(err, null);

        }


    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    }, async(email, senha, done) => {
        try {
            console.log("essrr");
            const user = await UserModel.findOne({ where: { email: email } });
            if (!user) return done(null, false);

            const isValid = bcrypt.compareSync(senha, user.senha);
            if (!isValid) return done(null, false);

            done(null, user);

        } catch (err) {
            console.log(err);
            done(err, false);
        }
    }));

}