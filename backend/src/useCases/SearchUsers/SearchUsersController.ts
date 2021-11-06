import { Request, Response } from "express";
import { SearchUsersUseCase } from "./SearchUsersUseCase";

export class SearchUsersController{
    constructor(private searchUsersUseCase: SearchUsersUseCase){}

    async handle(request: Request, response: Response){
        let { value } = request.query
        value = value.toString().toLowerCase()

        try{
            const users = await this.searchUsersUseCase.execute(value)
            return response.json(users)
        }
        catch(error){
            return response.status(500).json({ error: true, message: 'Ocorreu um erro ao pesquisar usuários', messageError: error.message })
        }
    }
}