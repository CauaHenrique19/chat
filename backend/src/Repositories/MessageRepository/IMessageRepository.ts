import { Message } from '../../Entities/Message'
import { MessageEnum } from '../../Enums/MessageEnum';

export interface IMessageRepository{
    save(message: Message) : Promise<Message>
    update(id: string, status: MessageEnum) : Promise<Message>
}