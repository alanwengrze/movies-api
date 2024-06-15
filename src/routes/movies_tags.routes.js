const { Router } = require('express');

const MoviesTagsController = require('../controller/MoviesTagsController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const moviesTagsRoutes = Router();

const moviesTagsController = new MoviesTagsController();

moviesTagsRoutes.get('/', ensureAuthenticated, moviesTagsController.index);

module.exports = moviesTagsRoutes;