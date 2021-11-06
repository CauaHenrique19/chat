import { Request, Response } from "express";
import { AcceptFriendshipUseCase } from "./AcceptFriendshipUseCase";
import { IAccpetFriendshipDTO } from "./IAcceptFriendshipDTO";

export class AcceptFriendshipController{
    constructor(private acceptFriendshipUseCase: AcceptFriendshipUseCase){}

    async handle(request: Request, response: Response){
        const { id, receiver_id, requester_id } : IAccpetFriendshipDTO = request.body

        try{
            const friendship = await this.acceptFriendshipUseCase.execute({ id, receiver_id, requester_id })
            return response.json(friendship)
        }
        catch(error){
            response.status(400).json({ error: true, message: 'Ocorreu um erro ao aceitar solicitação de amizade', messageError: error.message })
        }
    }
}