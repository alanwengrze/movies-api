
const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");
class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({ name, email, password }) {

    const checkUserExists = await this.userRepository.findUserByEmail(email);

    if(checkUserExists){
      throw new AppError("Este e-mail já está em uso.")
    }

    const hashPassword = await hash(password, 8);
    password = hashPassword

    const user = await this.userRepository.create({ name, email, password: hashPassword });

    return user;
  }
}

module.exports = UserCreateService;