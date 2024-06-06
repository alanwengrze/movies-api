const { Router } = require('express');

const MoviesNotesController = require('../controller/MoviesNotesController');

const moviesNotesRoutes = Router();

const moviesNotesController = new MoviesNotesController();

moviesNotesRoutes.post('/:user_id', moviesNotesController.create);

moviesNotesRoutes.get('/:id', moviesNotesController.show);

moviesNotesRoutes.get('/', moviesNotesController.index);

moviesNotesRoutes.delete('/:id', moviesNotesController.delete);


module.exports = moviesNotesRoutes;