const express = require('express');
const routes = express.Router();


const HomeController = require('./controller/homeController');

routes.get('/', HomeController.index);
routes.get('/Login', HomeController.login);

module.exports = routes;     