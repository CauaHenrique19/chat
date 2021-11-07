import { MessageRepository } from "../../Repositories/MessageRepository/MessageRepository";
import { ReadMessageController } from "./ReadMessageController";
import { ReadMessageUseCase } from "./ReadMessageUseCase";

const messageRepository = new MessageRepository()
const readMessageUseCase = new ReadMessageUseCase(messageRepository)
const readMessageController = new ReadMessageController(readMessageUseCase)

export { readMessageController }