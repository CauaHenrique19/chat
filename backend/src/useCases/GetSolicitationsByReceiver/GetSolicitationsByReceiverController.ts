import { Request, Response } from "express";
import { GetSolicitationsByReceiverUseCase } from "./GetSolicitationsByReceiverUseCase";

export class GetSolicitationsByReceiverController{
    constructor(private getSolicitationsByReceiverUseCase: GetSolicitationsByReceiverUseCase){}

    async handle(request: Request, response: Response){
        const { receiver_id } = request.params

        try{
            const solicitations = await this.getSolicitationsByReceiverUseCase.execute(receiver_id)
            response.json(solicitations)
        }
        catch(error){
            response.status(400).json({ message: 'Ocorreu um erro ao buscar solicitações!', error: error.message })
        }
    }
}