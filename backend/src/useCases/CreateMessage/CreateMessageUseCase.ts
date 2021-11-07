import { IMessageRepository } from "../../Repositories/MessageRepository/IMessageRepository";
import { ICreateMessageDTO } from "./ICreateMessageDTO";
import { Message } from "../../Entities/Message";
import { MessageEnum } from "../../Enums/MessageEnum";

export class CreateMessageUseCase{
    constructor(private messageRepository : IMessageRepository){}

    async execute(message: ICreateMessageDTO) : Promise<Message>{
        const messageEntity = new Message({ 
            from: message.from,
            to: message.to,
            content: message.content,
            created_at: new Date,
            status: MessageEnum.Pending
        })

        const messageDb = await this.messageRepository.save(messageEntity)
        return messageDb
    }
}