import { IMessageRepository } from "../../Repositories/MessageRepository/IMessageRepository";
import { IUserRepository } from "../../Repositories/UserRepository/IUserRepository";
import { IGetLastConversationsDTO } from "./IGetLastConversationsDTO";

export class GetLastConversationsUseCase {
    constructor(
        private messageRepository: IMessageRepository,
        private userRepository: IUserRepository,
    ) { }

    async execute(userId: string): Promise<IGetLastConversationsDTO[]> {

        const conversations = await this.messageRepository.getLastConversations(userId)
        const conversationsWithLastMessages = await Promise.all(conversations.map(async (conversation) => {
            const message = await this.messageRepository.getLastMessageBetweenUsers(conversation.from, conversation.to)

            return {
                ...conversation,
                message
            }
        }))

        const messagesInConversations = []

        const lastConversations = await Promise.all(conversationsWithLastMessages
            .map(conversation => {
                const conversationWithSameMessage = conversationsWithLastMessages
                    .filter(conversationFind => conversationFind.message.id === conversation.message.id)

                if(!messagesInConversations.includes(conversationWithSameMessage[0].message)){
                    messagesInConversations.push(conversationWithSameMessage[0].message)
                    return conversationWithSameMessage[0]
                }
            })
            .filter(lastConversation => lastConversation)
            .sort((a, b) => {
                if (a.message.created_at < b.message.created_at) {
                    return 1;
                }
                if (a.message.created_at > b.message.created_at) {
                    return -1;
                }
                return 0
            })
            .map(async (conversation) => {
                const user = await this.userRepository.findById(conversation.to)
                const pendingMessages = await this.messageRepository.getPendingMessages(conversation.from, conversation.to)
                const lastConversation : IGetLastConversationsDTO = { ...conversation, user, pendingMessages }
                return lastConversation
            })
        )
        
        return lastConversations
    }
}