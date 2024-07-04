const knex = require('../database/knex');
class NoteRepository {
  async create({ title, description, rating, movies_tags, user_id }) {

    const [ note_id ] = await knex('movies_notes').insert({
      title,
      description,
      rating,
      user_id
    });

    if(movies_tags){
      const moviesTagsInsert = movies_tags.map(name => {
        return{
          note_id,
          name,
          user_id
        }
      });
      await knex('movies_tags').insert(moviesTagsInsert);
    }

    return {id: note_id}; //retorna o id da nota criada no Insomnia
  }

  async findById(id) {
    const note = await knex('movies_notes').where({ id }).first();
    const tags = await knex('movies_tags').where({ note_id: id }).orderBy('name');
    return {
      ...note,
      tags
    }
  }
}

module.exports = NoteRepository;