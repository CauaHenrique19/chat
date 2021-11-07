import { Message } from "../../Entities/Message";
import { User } from "../../Entities/User";

export interface IGetLastConversationsDTO{
    from: string
    to: string
    message: Message
    user: User
}