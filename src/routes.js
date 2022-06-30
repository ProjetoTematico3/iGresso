const passport = require('passport');
const express = require('express');
const routes = express.Router();

const authenticationMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/Login');
}

const HomeController = require('./controller/homeController');
const LoginController = require('./controller/loginController');
const AdminController = require('./controller/adminController');
const MovieController = require('./controller/movieController');
const RoomController = require('./controller/roomController');
const scheduleController = require('./controller/scheduleController');
const newsController = require('./controller/newsController');
const { decodeBase64 } = require('bcryptjs');
const upload = require('./utils/multerConfig');

const IngressController = require('./controller/ingressController');

routes.get('/', HomeController.index);
routes.get('/Login', LoginController.login);
routes.post('/Login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/Login?fail=true'
}));
routes.get('/Logout', LoginController.logout);

routes.get('/Admin', AdminController.index);
routes.get('/Admin/SyncImages', AdminController.syncImages);
routes.post('/Register', LoginController.register);
routes.post('/registration', LoginController.registration);
routes.get('/Room', RoomController.index);
routes.post('/Room/Create', RoomController.create);


routes.get('/Schedule', scheduleController.index);
routes.post('/Schedule/Create', scheduleController.create);

routes.get('/News', newsController.index);
routes.get('/News/Create', newsController.create);
routes.post('/News/AddNews', upload.single("newsImage"), newsController.addNews);



routes.get('/SignUp', LoginController.signup);

routes.get('/employee', LoginController.employee);


routes.get('/Movies', MovieController.index);
routes.get('/Movie/:id', MovieController.movie);
routes.post('/Movie/AddReview', MovieController.addReview);
routes.post('/movieList', MovieController.list);
routes.post('/reviewList', MovieController.reviewList);
routes.get('/deleteReview', MovieController.deleteReview);
routes.get('/ingress/buy/:id_schedule', IngressController.buy);


module.exports = routes;
