import { Request, Response } from "express";
import { GetLastConversationsUseCase } from "./GetLastConversationsUseCase";

export class GetLastConversationsController{
    constructor(private getLastConversationsUseCase : GetLastConversationsUseCase){}

    async handle(request: Request, response: Response){
        const { userId } = request.params

        try{
            const conversations = await this.getLastConversationsUseCase.execute(userId)
            return response.json(conversations)
        }
        catch(error){
            return response.status(400).json({ message: 'Ocorreu um erro ao buscar conversas!', error: error.message })
        }
    }
}