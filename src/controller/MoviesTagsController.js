const knex = require('../database/knex');

class MoviesTagsController {
  async index(request, response) {
    const user_id = request.user.id;

    const tags = await knex('movies_tags').where({ user_id }).orderBy('name');

    return response.json(tags)
  }
}

module.exports = MoviesTagsController;