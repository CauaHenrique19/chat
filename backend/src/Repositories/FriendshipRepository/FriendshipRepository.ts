import { Friendship } from "../../Entities/Friendship";
import { IFriendshipRepository } from "./IFriendshipRepository";
import knex from '../../database/connection'
import { User } from "../../Entities/User";
import { FriendshipEnum } from "../../Enums/FriendshipEnum";

export class FriendshipRepository implements IFriendshipRepository{
    async save(friendship: Friendship) : Promise<Friendship>{
        const [friendshipDb] = await knex('friendship')
            .insert(friendship, '*')

        return friendshipDb
    }

    async update(id: string, status: FriendshipEnum) : Promise<Friendship>{
        const [friendshipDb] = await knex('friendship')
            .update({ status }, '*')
            .where({ id })

        return friendshipDb
    }

    async getFriends(userId: string) : Promise<User[]>{
        const friends : User[] = []; 

        const { rows: usersByRequesterId } = await knex.raw(`
            select 
                users.id, 
                users.email, 
                users.name, 
                users.key_image, 
                users.url_image, 
                friendship.created_at, 
                to_char(created_at, 'DD/MM/YYYY') as created_at 
            from friendship
            inner join users on users.id = friendship.receiver_id
            where requester_id = '${userId}' and status = 'accepted'
        `)

        friends.push(...usersByRequesterId)

        const { rows: usersByReceiverId } = await knex.raw(`
            select 
                users.id, 
                users.email, 
                users.name, 
                users.key_image, 
                users.url_image, 
                friendship.created_at, 
                to_char(created_at, 'DD/MM/YYYY') as created_at 
            from friendship
            inner join users on users.id = friendship.requester_id
            where receiver_id = '${userId}' and status = 'accepted'
        `)

        friends.push(...usersByReceiverId)

        return friends
    }
}