const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");


describe("UserCreateService", () => {
  let userRepository = null;
  let userCreateService = null;
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepository);
  })
  test("user should be created", async () => {
    const user = {
      name: 'John Doe',
      email: 'H8xJt@example.com',
      password: '123456'
    }

    const userCreated = await userCreateService.execute(user);
    console.log(userCreated)
    expect(userCreated).toHaveProperty("id");
  })

  test("should not be able to create an user with exists email", async () => {
    const user = {
      name: 'John Doe',
      email: 'H8xJt@example.com',
      password: '123456'
    }

    await userCreateService.execute(user);
    await expect(userCreateService.execute(user)).rejects.toBeInstanceOf(AppError)
  })
})