const { Router } = require('express');

const UsersController = require('../controller/UsersController');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.put('/', ensureAuthenticated, usersController.update);

usersRoutes.post('/', usersController.create);


module.exports = usersRoutes;