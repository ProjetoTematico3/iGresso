
const express = require('express');
const routes = require('./routes');
const app = express();
const path = require('path');


app.use(routes);

app.use('/src/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');

app.listen(2077);