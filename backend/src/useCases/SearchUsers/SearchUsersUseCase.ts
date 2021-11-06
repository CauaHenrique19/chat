import { User } from "../../Entities/User";
import { IUserRepository } from "../../Repositories/UserRepository/IUserRepository";

export class SearchUsersUseCase{
    constructor(private userRepository: IUserRepository){}

    async execute(value: string) : Promise<User[]>{
        const users = await this.userRepository.search(value)
        return users
    }
}