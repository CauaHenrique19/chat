import { IMessageRepository } from "../../Repositories/MessageRepository/IMessageRepository";
import { ICreateMessageDTO } from "./ICreateMessageDTO";
import { Message } from "../../Entities/Message";
import { MessageEnum } from "../../Enums/MessageEnum";
import { io } from "../../server";

export class CreateMessageUseCase{
    constructor(private messageRepository : IMessageRepository){}

    async execute(message: ICreateMessageDTO) : Promise<Message>{
        const messageEntity = new Message({ 
            from: message.from,
            to: message.to,
            content: message.content,
            created_at: new Date,
            answer_message_id: message.answer_message_id,
            status: MessageEnum.Pending
        })

        const messageDb = await this.messageRepository.save(messageEntity)

        if(messageDb.answer_message_id){
            messageDb.answered_message = await this.messageRepository.getMessage(messageDb.answer_message_id)
        }
        
        io.to(`${messageEntity.to}`).emit("message", messageEntity)

        return messageDb
    }
}