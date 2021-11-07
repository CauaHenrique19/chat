import { Request, Response } from "express";
import { CreateMessageUseCase } from "./CreateMessageUseCase";
import { ICreateMessageDTO } from "./ICreateMessageDTO";

export class CreateMessageController{
    constructor(private createMessageUseCase: CreateMessageUseCase){}

    async handle(request: Request, response: Response){
        const { to, from, content } : ICreateMessageDTO = request.body

        try{
            const message = await this.createMessageUseCase.execute({ to, from, content })
            return response.json(message)
        }
        catch(error){
            return response.status(400).json({ error: true, message: 'Ocorreu um erro ao enviar mensagem!', messageError: error.message })
        }
    }
}