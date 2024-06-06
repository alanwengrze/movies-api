const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const { hash, compare } = require ('bcryptjs');
class UsersController{

  async create (request, response){
    const { name, email } = request.body;
    let { password } = request.body;

    const checkUserExists = await knex('users').where({ email }).first();

    if(checkUserExists){
      throw new AppError("Este e-mail já está em uso.")
    }

    const hashPassword = await hash(password, 8);
    password = hashPassword

    await knex('users').insert({
      name,
      email,
      password
    })

    response.status(201).json()
  }
  async update(request, response){
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const user = await knex('users').where({ id }).first();

    if(!user){
      throw new AppError("Usuário não encontrado")
    }

    const userWithSameEmail = await knex('users').where({ email }).first();

     if(userWithSameEmail && userWithSameEmail.id !== user.id){
      throw new AppError("Este e-mail já está em uso.")
   }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password){
      throw new AppError("Voce precisa informar a senha antiga para definir a nova senha")
    }

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);
      
      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere.");
      }
      user.password = await hash(password, 8);
    }

    if(password === old_password){
      throw new AppError("A nova senha deve ser diferente da antiga")
    }

    await knex('users').update
    ({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: knex.fn.now()
    }).where({ id });
  
    return response.json()
  }
}

module.exports = UsersController;