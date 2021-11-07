import { Request, Response } from "express";
import { ReadMessageUseCase } from "./ReadMessageUseCase";

export class ReadMessageController{
    constructor(private readMessageUseCase: ReadMessageUseCase){}

    async handle(request: Request, response: Response){
        const { ids } = request.body

        try{
            const messagesUpdated = await this.readMessageUseCase.execute(ids)
            return response.json(messagesUpdated)
        }
        catch(error){
            return response.status(400).json({ error: true, message: 'Ocorreu um erro ao ler mensagem!', messageError: error.message })
        }
    }
}