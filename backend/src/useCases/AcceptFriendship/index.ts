import { FriendshipRepository } from "../../Repositories/FriendshipRepository/FriendshipRepository";
import { AcceptFriendshipController } from "./AcceptFriendshipController";
import { AcceptFriendshipUseCase } from "./AcceptFriendshipUseCase";

const friendshipRepository = new FriendshipRepository()
const acceptFriendshipUseCase = new AcceptFriendshipUseCase(friendshipRepository)
const acceptFriendshipController = new AcceptFriendshipController(acceptFriendshipUseCase)

export { acceptFriendshipController }