import { MessageRepository } from "../../Repositories/MessageRepository/MessageRepository";
import { GetMessagesOfConversationsController } from "./GetMessagesOfConversationsController";
import { GetMessagesOfConversationsUseCase } from "./GetMessagesOfConversationsUseCase";

const messageRepository = new MessageRepository()
const getMessagesOfConversationsUseCase = new GetMessagesOfConversationsUseCase(messageRepository)
const getMessagesOfConversationsController = new GetMessagesOfConversationsController(getMessagesOfConversationsUseCase)

export { getMessagesOfConversationsController }