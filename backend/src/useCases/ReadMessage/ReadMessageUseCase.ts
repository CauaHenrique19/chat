import { Message } from "../../Entities/Message";
import { MessageEnum } from "../../Enums/MessageEnum";
import { IMessageRepository } from "../../Repositories/MessageRepository/IMessageRepository";

export class ReadMessageUseCase{
    constructor(private messageRepository: IMessageRepository){}

    async execute(ids: string[]) : Promise<Message[]>{
        const messagesUpdated = await this.messageRepository.update(ids, MessageEnum.Read)
        return messagesUpdated
    }
}