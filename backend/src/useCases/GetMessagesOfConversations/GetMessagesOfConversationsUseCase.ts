import { Message } from "../../Entities/Message";
import { IMessageRepository } from "../../Repositories/MessageRepository/IMessageRepository";

export class GetMessagesOfConversationsUseCase{
    constructor(private messageRepository: IMessageRepository){}

    async execute(from: string, to: string) : Promise<Message[]>{
        const messages = await this.messageRepository.getMessagesBetweenUsers(from, to)
        return messages
    }
}