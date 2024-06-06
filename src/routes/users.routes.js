const { Router } = require('express');

const UsersController = require('../controller/UsersController');

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.put('/:id', usersController.update);

usersRoutes.post('/', usersController.create);


module.exports = usersRoutes;