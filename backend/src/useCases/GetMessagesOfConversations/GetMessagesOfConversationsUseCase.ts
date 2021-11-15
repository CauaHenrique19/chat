import { Message } from "../../Entities/Message";
import { IMessageRepository } from "../../Repositories/MessageRepository/IMessageRepository";
import { formatDate } from "../../Utils/FormatDate";

export class GetMessagesOfConversationsUseCase{
    constructor(private messageRepository: IMessageRepository){}

    async execute(from: string, to: string) : Promise<Message[]>{
        const messages = await this.messageRepository.getMessagesBetweenUsers(from, to)

        const formatedMessages = Promise.all(messages.map(async (message) => {
            if(message.answer_message_id){
                message.answered_message = await this.messageRepository.getMessage(message.answer_message_id)
            }
            message.created_at_string = formatDate(message.created_at)
            return message
        }))

        return formatedMessages
    }
}