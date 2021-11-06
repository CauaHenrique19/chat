import { UserRepository } from "../../Repositories/UserRepository/UserRepository";
import { SearchUsersController } from "./SearchUsersController";
import { SearchUsersUseCase } from "./SearchUsersUseCase";

const userRepository = new UserRepository()
const searchUsersUseCase = new SearchUsersUseCase(userRepository)
const searchUsersController = new SearchUsersController(searchUsersUseCase)

export { searchUsersController }