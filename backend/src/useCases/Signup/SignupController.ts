import { Request, Response } from "express";
import { IFile } from "../../Providers/IFileUpload";
import { ISignupDTO } from "./ISignupDTO";
import { SignupUseCase } from "./SignupUseCase";

export class SignupController{
    constructor(private signupUseCase : SignupUseCase){}
    
    async handle(request: Request, response: Response){
        const { name, email, confirmPassword, password } : ISignupDTO = request.body
        const file : IFile = {
            name: request.file.originalname,
            content: request.file.buffer,
            type: request.file.mimetype
        }

        try{
            const returnedUser = await this.signupUseCase.execute({ name, email, confirmPassword, password }, file)
            response.json(returnedUser)
        }
        catch(error){
            response.status(400).json({ message: 'Ocorreu um erro ao criar conta!', error: error.message })
        }
    }
}