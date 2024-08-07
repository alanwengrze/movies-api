const knex = require('../database/knex');

class UserRepository{
  async findUserByEmail(email) {
    const user = await knex("users").where({ email }).first();
    return user;
  }
  async create({ name, email, password }) {
    const userId = await knex("users").insert({ name, email, password }).returning("*");

    return {id: userId};
  }
}

module.exports = UserRepository;