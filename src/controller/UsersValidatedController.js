const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class UsersValidatedController {
  async index (request, response){
    const user_id = request.user.id;
    const checkUser = await knex('users').where({id: user_id});
    if (checkUser.length === 0) {
      throw new AppError("User does not exists.", 401);
    }

    response.status(200).json()
  }
}

module.exports = UsersValidatedController;