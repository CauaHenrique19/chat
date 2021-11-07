import { Request, Response } from "express";
import { GetMessagesOfConversationsUseCase } from "./GetMessagesOfConversationsUseCase";

export class GetMessagesOfConversationsController{
    constructor(private getMessagesOfConversationsUseCase: GetMessagesOfConversationsUseCase){}

    async handle(request: Request, response: Response){
        const { from, to } = request.params

        try{
            const messages = await this.getMessagesOfConversationsUseCase.execute(from, to)
            return response.json(messages)
        }
        catch(error){
            response.status(400).json({ message: 'Ocorreu um erro ao buscar mensagens!!', error: error.message })
        }
    }
}