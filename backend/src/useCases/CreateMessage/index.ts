import { MessageRepository } from "../../Repositories/MessageRepository/MessageRepository";
import { UserRepository } from "../../Repositories/UserRepository/UserRepository";
import { CreateMessageController } from "./CreateMessageController";
import { CreateMessageUseCase } from "./CreateMessageUseCase";

const messageRepository = new MessageRepository()
const userRepository = new UserRepository()
const createMessageUseCase = new CreateMessageUseCase(messageRepository, userRepository)
const createMessageController = new CreateMessageController(createMessageUseCase)

export { createMessageController }