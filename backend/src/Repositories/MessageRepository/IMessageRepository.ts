import { Message } from '../../Entities/Message'
import { MessageEnum } from '../../Enums/MessageEnum';

export interface IMessageRepository{
    save(message: Message) : Promise<Message>
    update(id: string, status: MessageEnum) : Promise<Message>
    getLastConversations(userId: string) : Promise<Message[]>
    getLastMessageBetweenUsers(from: string, to: string) : Promise<Message>
}