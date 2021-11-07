import { MessageRepository } from "../../Repositories/MessageRepository/MessageRepository";
import { CreateMessageController } from "./CreateMessageController";
import { CreateMessageUseCase } from "./CreateMessageUseCase";

const messageRepository = new MessageRepository()
const createMessageUseCase = new CreateMessageUseCase(messageRepository)
const createMessageController = new CreateMessageController(createMessageUseCase)

export { createMessageController }