const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const NoteRepository = require('../repositories/NoteRepository');
const NoteCreateService = require('../services/NoteCreateService');

class MoviesNotesController {
  async create(request, response) {
    const { title, description, rating, movies_tags } = request.body;
    const user_id = request.user.id;

    const noteRepository = new NoteRepository();
    const noteCreateService = new NoteCreateService(noteRepository);
    const note = await noteCreateService.execute({ title, description, rating, movies_tags, user_id });

    response.status(201).json(note);
  }

  async show(request, response) {
    const { id } = request.params;

    const noteRepository = new NoteRepository();
    const note = await noteRepository.findById(id);
    
    return response.json(note);
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