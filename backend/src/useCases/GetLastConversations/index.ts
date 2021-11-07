import { MessageRepository } from "../../Repositories/MessageRepository/MessageRepository";
import { UserRepository } from "../../Repositories/UserRepository/UserRepository";
import { GetLastConversationsController } from "./GetLastConversationsController";
import { GetLastConversationsUseCase } from "./GetLastConversationsUseCase";

const messageRepository = new MessageRepository()
const userRepository = new UserRepository()
const getLastConversationsUseCase = new GetLastConversationsUseCase(messageRepository, userRepository)
const getLastConversationsController = new GetLastConversationsController(getLastConversationsUseCase)

export { getLastConversationsController }