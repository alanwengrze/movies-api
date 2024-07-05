const AppError = require("../utils/AppError");
class NoteCreateService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute({ title, description, rating, movies_tags, user_id }) {
    if(typeof rating !== "number") {
      throw new AppError("A nota deve ser um número");
    }

    if(rating < 0 || rating > 5){
      throw new AppError("A nota deve estar entre 0 e 5");
    }
    
    const newNote = await this.noteRepository.create({ title, description, rating, movies_tags, user_id });
    return newNote;
  }
}

module.exports = NoteCreateService;