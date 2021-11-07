import { Message } from "../../Entities/Message";
import { IMessageRepository } from "./IMessageRepository";
import { MessageEnum } from "../../Enums/MessageEnum";
import knex from '../../database/connection'

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

    async getLastConversations(userId: string): Promise<Message[]> {
        const { rows: conversations } = await knex
            .raw(`select distinct messages.from, messages.to from messages 
        where messages.to = '${userId}' or messages.from = '${userId}'`)

        return conversations
    }

    async getLastMessageBetweenUsers(from: string, to: string): Promise<Message> {
        const [lastMessage] = await knex('messages')
            .select('*')
            .where({ to, from })
            .orWhere({ to: from, from: to })
            .orderBy('created_at', 'desc')
            .limit(1)

        return lastMessage
    }

    async getMessagesBetweenUsers(from: string, to: string): Promise<Message[]> {
        const messages = await knex('messages')
            .select('*')
            .where({ to, from })
            .orWhere({ to: from, from: to })
            .orderBy('created_at')

        return messages
    }

    async getPendingMessages(from: string, to: string): Promise<Number | string> {
        const [{ count }] = await knex('messages')
            .count('id')
            .where({ from, to, status: MessageEnum.Pending })
        
        return count
    }
    
}