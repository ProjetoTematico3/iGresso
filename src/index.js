const express = require('express');
const routes = require('./routes');
const app = express();
const path = require('path');
const { hash } = require('bcryptjs');
const db = require('./database');
const User = require('./model/User');
const sequelize = require('./database');
const PaymentMethod = require('./model/PaymentMethod');
const Order = require('./model/Order');

//const repository = require('./model/modelRepository'); 

app.use(routes);

app.use('/src/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');


db.sync();

/*(async() => {
    try {
        await db.sync({ force: true });
        var checkUser = await User.findByPk(1);
        if (checkUser == null) {
            await User.create({
                email: 'root@root.com',
                senha: await hash("12345", 8),
                nome: 'root',
                tipo_usuario: 0
            })
        }
    } catch (error) {
        console.log(error);
    }
})();*/


app.listen(2077);