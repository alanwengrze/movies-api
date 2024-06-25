const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage')

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    const diskStorage = new DiskStorage;

    const user = await knex('users').where({ id: user_id }).first();

    if(!user){
      throw new AppError("Somente usuários autenticados podem alterar o avatar", 401);
    }

    //deletar avatar anterior (caso exista)
    if(user.avatar){
      await diskStorage.deleteFile(user.avatar);
    }

    //pegando o arquivo e armazenando na variável
    const filename = await diskStorage.saveFile(avatarFilename);

    //passando o nome do arquivo para o user
    user.avatar = filename;

    //atualizando o user
    await knex('users').update(user).where({ id: user_id });

    return response.json(user);
  }
}

module.exports = UserAvatarController;