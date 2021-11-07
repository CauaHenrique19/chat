import { Message } from "../../Entities/Message";
import { IMessageRepository } from "./IMessageRepository";
import knex from '../../database/connection'
import { MessageEnum } from "../../Enums/MessageEnum";

export class MessageRepository implements IMessageRepository{
    async save(message: Message): Promise<Message> {
        const [messageDb] = await knex('messages')
            .insert(message, '*')

        return messageDb
    }

    async update(id: string, status: MessageEnum): Promise<Message> {
        const [messageDb] = await knex('messages')
            .update({ status }, '*')
            .where({ id })

        return messageDb
    }
}