import { Friendship } from "../../Entities/Friendship";
import { User } from "../../Entities/User";

export interface IFriendshipRepository{
    save(friendship: Friendship) : Promise<Friendship>
    update(friendship: Friendship) : Promise<Friendship>
    getFriends(userId: string) : Promise<User[]>
}