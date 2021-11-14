import { FriendshipRepository } from "../../Repositories/FriendshipRepository/FriendshipRepository";
import { UserRepository } from "../../Repositories/UserRepository/UserRepository";
import { CreateFriendshipController } from "./CreateFriendshipController";
import { CreateFriendshipUseCase } from "./CreateFriendshipUseCase";

const friendshipRepository = new FriendshipRepository()
const userRepository = new UserRepository()
const createFriendshipUseCase = new CreateFriendshipUseCase(friendshipRepository, userRepository)
const createFriendshipController = new CreateFriendshipController(createFriendshipUseCase)

export { createFriendshipController }