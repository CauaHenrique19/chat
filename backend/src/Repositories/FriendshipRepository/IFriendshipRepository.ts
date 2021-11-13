import { Friendship } from "../../Entities/Friendship";
import { User } from "../../Entities/User";
import { FriendshipEnum } from "../../Enums/FriendshipEnum";

export interface IFriendshipRepository{
    save(friendship: Friendship) : Promise<Friendship>
    update(id: string, status: FriendshipEnum) : Promise<Friendship>
    getFriends(userId: string) : Promise<User[]>
    getSolicitationsByReceiver(receiverId: string) : Promise<Friendship[]>
}