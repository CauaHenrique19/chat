import { IMessageRepository } from "../../Repositories/MessageRepository/IMessageRepository";
import { IUserRepository } from "../../Repositories/UserRepository/IUserRepository";
import { ICreateMessageDTO, IMessageDTO } from "./ICreateMessageDTO";
import { Message } from "../../Entities/Message";
import { MessageEnum } from "../../Enums/MessageEnum";
import { io } from "../../server";

export class CreateMessageUseCase{
    constructor(
        private messageRepository : IMessageRepository,
        private userRepository: IUserRepository
    ){}

    async execute(message: ICreateMessageDTO) : Promise<IMessageDTO>{
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

        const receiverUser = await this.userRepository.findById(messageDb.from)
        const finalMessage : IMessageDTO = {
            message: messageEntity,
            user: receiverUser
        }
        
        io.to(`${messageEntity.to}`).emit("message", finalMessage)

        return finalMessage
    }
}