import { FriendshipRepository } from "../../Repositories/FriendshipRepository/FriendshipRepository";
import { CreateFriendshipController } from "./CreateFriendshipController";
import { CreateFriendshipUseCase } from "./CreateFriendshipUseCase";

const friendshipRepository = new FriendshipRepository()
const createFriendshipUseCase = new CreateFriendshipUseCase(friendshipRepository)
const createFriendshipController = new CreateFriendshipController(createFriendshipUseCase)

export { createFriendshipController }