const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class MoviesNotesController {
  
  async create(request, response) {
    const { title, description, rating, movies_tags } = request.body;
    const user_id = request.user.id;

    if(rating < 0 || rating > 5){
      throw new AppError("A nota deve estar entre 0 e 5");
    }

    const [ note_id ] = await knex('movies_notes').insert({
      title,
      description,
      rating,
      user_id
    });

    const moviesTagsInsert = movies_tags.map(name => {
      return{
        note_id,
        name,
        user_id
      }
    });

    await knex('movies_tags').insert(moviesTagsInsert);
    response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex('movies_notes').where({ id }).first();

    const tags = await knex('movies_tags').where({ note_id: id }).orderBy('name');

    return response.json({
      ...note,
      tags
    });
  }

  async index(request, response) {
    const { title, rating, description, movies_tags } = request.query;
    const user_id = request.user.id;
    let notes

    if(!title, !rating, !description, !movies_tags){
      notes = await knex('movies_notes')
      .where({ user_id })
      .groupBy('title')
      .orderBy('title');
    }

    if(movies_tags){
      const filterMoviesTags = movies_tags.split(',').map(tag => tag.trim());

      notes = await knex('movies_tags')
        .select([
          'movies_notes.id',
          'movies_notes.title',
          'movies_notes.description',
          'movies_notes.rating',
          'movies_notes.user_id'
        ])
        .where("movies_notes.user_id", user_id)
        .whereLike("movies_notes.title", `%${title}%`)
        .whereIn('name', filterMoviesTags)
        .innerJoin("movies_notes", "movies_notes.id", "movies_tags.note_id")
        .groupBy('title')
        .orderBy("movies_notes.title")
    }else if(description){
      notes = await knex('movies_notes')
      .where({user_id})
      .whereLike('description', `%${description}%`)
      .groupBy('title')
      .orderBy('title')
    }else if(title){
      notes = await knex('movies_notes')
      .where({user_id})
      .whereLike('title', `%${title}%`)
      .groupBy('title')
      .orderBy('title')
    }

  

    const userTags = await knex('movies_tags').where({ user_id });

    const notesWithTags = notes.map(note =>{
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return{
        ...note,
        movies_tags: noteTags
      }
    })

    return response.json(notesWithTags);

  }

  async delete(request, response) {
    const { id } = request.params;
    await knex('movies_notes').where({ id }).delete();
    response.json();
  }

}

module.exports = MoviesNotesController;