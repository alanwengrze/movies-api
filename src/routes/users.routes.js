const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const UsersController = require('../controller/UsersController');
const UserAvatarController = require('../controller/UserAvatarController');
const UsersValidatedController = require("../controller/UsersValidatedController");

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersValidatedController = new UsersValidatedController();

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.put('/', ensureAuthenticated, usersController.update);

usersRoutes.post('/', usersController.create);

usersRoutes.get('/validated', ensureAuthenticated, usersValidatedController.index);

usersRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = usersRoutes;