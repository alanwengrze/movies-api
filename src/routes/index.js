const { Router } = require('express');

const usersRouter = require('./users.routes');
const moviesNotesRouter = require('./movies_notes.routes');
const moviesTagsRouter = require('./movies_tags.routes');

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movies_notes", moviesNotesRouter);
routes.use("/movies_tags", moviesTagsRouter);

module.exports = routes;