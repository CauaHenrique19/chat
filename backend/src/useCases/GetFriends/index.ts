import { FriendshipRepository } from "../../Repositories/FriendshipRepository/FriendshipRepository";
import { GetFriendsController } from "./GetFriendsController";
import { GetFriendsUseCase } from "./GetFriendsUseCase";

const friendshipRepository = new FriendshipRepository()
const getFriendsUseCase = new GetFriendsUseCase(friendshipRepository)
const getFriendsController = new GetFriendsController(getFriendsUseCase)

export { getFriendsController }