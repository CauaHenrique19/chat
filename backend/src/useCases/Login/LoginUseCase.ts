import { IAuthenticatedDTO } from "../../DTO/IAuthenticatedUserDTO";
import { IUserRepository } from "../../Repositories/UserRepository/IUserRepository";
import { ILoginDTO } from './ILoginDTO'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class LoginUseCase{
    constructor(private userRepository : IUserRepository){}

    async execute(login: ILoginDTO) : Promise<IAuthenticatedDTO> {
        const userDb = await this.userRepository.findByEmail(login.email)
        if(!userDb) throw new Error('Usuário não encontrado!')

        if(!bcrypt.compareSync(login.password, userDb.password)) throw new Error('Senhas não conferem!')

        const token = jwt.sign({ id: userDb.id }, process.env.SECRET)
        delete userDb.password

        const authenticatedUser : IAuthenticatedDTO = {
            auth: true,
            token,
            user: userDb
        }

        return authenticatedUser
    }
}