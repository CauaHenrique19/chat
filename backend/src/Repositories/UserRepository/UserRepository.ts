import { User } from "../../Entities/User";
import { IUserRepository } from "./IUserRepository";
import knex from '../../database/connection'

export class UserRepository implements IUserRepository{
    async save (user : User) : Promise<User> {
        const [userDb] = await knex('users')
            .insert(user, ['id', 'name', 'email', 'key_image', 'url_image'])
        
        return userDb
    }

    async search(value: string) : Promise<User[]> {
        const usersSearch = await knex('users')
            .select('id', 'name', 'email', 'key_image', 'url_image')
            .where('name', 'like', `%${value}%`)
            .orWhere('email', 'like', `%${value}%`)

        return usersSearch
    }

    async findByEmail(email: string) : Promise<User>{
        const user = await knex('users')
            .select('*')
            .where({ email })
            .first()

        return user
    }
}