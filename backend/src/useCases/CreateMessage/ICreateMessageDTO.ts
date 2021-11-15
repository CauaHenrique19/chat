import { Message } from "../../Entities/Message";
import { User } from "../../Entities/User";

export interface ICreateMessageDTO{
    from: string
    to: string
    content: string
    answer_message_id: string
}

export interface IMessageDTO{
    message: Message,
    user: User
}