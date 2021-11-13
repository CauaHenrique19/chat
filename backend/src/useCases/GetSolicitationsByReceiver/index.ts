import { FriendshipRepository } from "../../Repositories/FriendshipRepository/FriendshipRepository";
import { GetSolicitationsByReceiverUseCase } from "./GetSolicitationsByReceiverUseCase";
import { GetSolicitationsByReceiverController } from "./GetSolicitationsByReceiverController";

const friendshipRepository = new FriendshipRepository()
const getSolicitationsByReceiverUseCase = new GetSolicitationsByReceiverUseCase(friendshipRepository)
const getSolicitationsByReceiverController = new GetSolicitationsByReceiverController(getSolicitationsByReceiverUseCase)

export { getSolicitationsByReceiverController }