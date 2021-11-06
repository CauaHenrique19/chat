import { IAuthenticatedDTO } from "../../DTO/IAuthenticatedUserDTO";
import { User } from "../../Entities/User";
import { IFile, IUploaderFile } from "../../Providers/IFileUpload";
import { IUserRepository } from "../../Repositories/UserRepository/IUserRepository";
import { ISignupDTO } from "./ISignupDTO";
import { hash } from "bcrypt";
import jwt from 'jsonwebtoken'

export class SignupUseCase{
    constructor(
        private userRepository : IUserRepository,
        private awsUploadProvider: IUploaderFile
    ){}

    async execute(user: ISignupDTO, file: IFile) : Promise<IAuthenticatedDTO>{

        if(user.password !== user.confirmPassword) throw new Error('Senhas não conferem!')

        const userDb = await this.userRepository.findByEmail(user.email)
        if(userDb) throw new Error('Usuário com esse email já cadastrado!')

        const { Key, Location } = await this.awsUploadProvider.upload(file)

        const password = await hash(user.password, 10)

        const userEntity = new User({ 
            email: user.email,
            name: user.name,
            key_image: Key,
            url_image: Location,
            password
        })

        const returnedUser = await this.userRepository.save(userEntity)
        const token = jwt.sign({ id: returnedUser.id }, process.env.SECRET)

        const authenticatedUser : IAuthenticatedDTO = {
            token,
            auth: true,
            user: returnedUser
        }

        return authenticatedUser
    }
}