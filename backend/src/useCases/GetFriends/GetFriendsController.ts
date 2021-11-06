import { Request, Response } from "express";
import { GetFriendsUseCase } from "./GetFriendsUseCase";

export class GetFriendsController{
    constructor(private getFriendsUseCase: GetFriendsUseCase){}

    async handle(request: Request, response: Response){
        const { userId } = request.params

        try {
            const friends = await this.getFriendsUseCase.execute(userId)
            return response.json(friends)
        } 
        catch (error) {
            return response.status(400).json({ error: true, message: 'Ocorreu um erro ao buscar amigos', messageError: error.message })
        }
    }
}