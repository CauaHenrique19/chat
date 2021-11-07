import { User } from "../../Entities/User";

export interface IUserRepository{
    save(user: User) : Promise<User>
    search(value: string) : Promise<User[]>
    findByEmail(email: string) : Promise<User>
    findById(id: string) : Promise<User>
}