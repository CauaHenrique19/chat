import { Request, Response } from "express";
import { ILoginDTO } from "./ILoginDTO";
import { LoginUseCase } from "./LoginUseCase";

export class LoginController{
    constructor(private loginUseCase : LoginUseCase){}

    async handle(request: Request, response: Response){
        const { email, password } : ILoginDTO = request.body

        try{
            const authenticatedUser = await this.loginUseCase.execute({ email, password })
            return response.json(authenticatedUser)
        }
        catch(error){
            response.status(400).json({ message: 'Ocorreu um erro ao fazer login!', error: error.message })
        }
    }
}