const { Router } = require('express');

const MoviesNotesController = require('../controller/MoviesNotesController');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const moviesNotesRoutes = Router();

const moviesNotesController = new MoviesNotesController();

moviesNotesRoutes.use(ensureAuthenticated);

moviesNotesRoutes.post('/', moviesNotesController.create);

moviesNotesRoutes.get('/:id', moviesNotesController.show);

moviesNotesRoutes.get('/', moviesNotesController.index);

moviesNotesRoutes.delete('/:id', moviesNotesController.delete);


module.exports = moviesNotesRoutes;