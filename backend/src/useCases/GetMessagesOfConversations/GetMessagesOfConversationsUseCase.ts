import { Message } from "../../Entities/Message";
import { IMessageRepository } from "../../Repositories/MessageRepository/IMessageRepository";
import { formatDate } from "../../Utils/FormatDate";

export class GetMessagesOfConversationsUseCase{
    constructor(private messageRepository: IMessageRepository){}

    async execute(from: string, to: string) : Promise<Message[]>{
        const messages = await this.messageRepository.getMessagesBetweenUsers(from, to)
        messages.map(message => message.created_at_string = formatDate(message.created_at))
        return messages
    }
}