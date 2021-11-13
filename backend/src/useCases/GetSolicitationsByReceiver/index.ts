import { FriendshipRepository } from "../../Repositories/FriendshipRepository/FriendshipRepository";
import { GetSolicitationsByReceiverUseCase } from "./GetSolicitationsByReceiverUseCase";
import { GetSolicitationsByReceiverController } from "./GetSolicitationsByReceiverController";
import { UserRepository } from "../../Repositories/UserRepository/UserRepository";

const friendshipRepository = new FriendshipRepository()
const userRepository = new UserRepository()

const getSolicitationsByReceiverUseCase = new GetSolicitationsByReceiverUseCase(friendshipRepository, userRepository)
const getSolicitationsByReceiverController = new GetSolicitationsByReceiverController(getSolicitationsByReceiverUseCase)

export { getSolicitationsByReceiverController }