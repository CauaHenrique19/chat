import { Friendship } from "../../Entities/Friendship";
import { IFriendshipRepository } from "./IFriendshipRepository";
import knex from '../../database/connection'
import { User } from "../../Entities/User";

export class FriendshipRepository implements IFriendshipRepository{
    async save(friendship: Friendship) : Promise<Friendship>{
        const [friendshipDb] = await knex('friendship')
            .insert(friendship, '*')

        return friendshipDb
    }

    async update(friendship: Friendship) : Promise<Friendship>{
        const [friendshipDb] = await knex('friendship')
            .update(friendship, '*')
            .where({ id: friendship.id })

        return friendshipDb
    }

    async getFriends(userId: string) : Promise<User[]>{
        const friends : User[] = []; 

        const usersByRequesterId = await knex('friendship')
            .select('users.id', 'users.email', 'users.name', 'users.key_image', 'users.url_image')
            .where({ requester_id: userId, status: 'accepted' })
            .join('users', 'users.id', 'friendship.receiver_id')

        friends.push(...usersByRequesterId)

        const usersByReceiverId = await knex('friendship')
            .select('users.id', 'users.email', 'users.name', 'users.key_image', 'users.url_image')
            .where({ receiver_id: userId, status: 'accepted' })
            .join('users', 'users.id', 'friendship.requester_id')

        friends.push(...usersByReceiverId)

        return friends
    }
}