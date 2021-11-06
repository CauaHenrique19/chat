import { Request, Response } from "express";
import { CreateFriendshipUseCase } from "./CreateFriendshipUseCase";
import { ICreateFriendshipDTO } from "./ICreateFriendshipDTO";

export class CreateFriendshipController{
    constructor(private createFriendshipUseCase: CreateFriendshipUseCase){}

    async handle(request: Request, response: Response){
        const { receiver_id, requester_id } : ICreateFriendshipDTO = request.body

        try{
            const friendship = await this.createFriendshipUseCase.execute({ receiver_id, requester_id })
            return response.json(friendship)
        }
        catch(error){
            response.status(400).json({ error: true, message: 'Ocorreu um erro inesperado', messageError: error.message })
        }
    }
}